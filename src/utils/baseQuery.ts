import {
  type BaseQueryFn,
  type FetchArgs,
  fetchBaseQuery,
  type FetchBaseQueryError,
  retry,
} from "@reduxjs/toolkit/query"
import type { RootState } from "@/store/store.ts"
import { logout, setTokens } from "@/store/auth.slice.ts"

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
    prepareHeaders: (headers, { getState }) => {
      const { accessToken } = (getState() as RootState).auth

      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`)
      }
      headers.set("Content-Type", "application/json")

      return headers
    },
  }),
  { maxRetries: 0 }
)

export const baseQueryWithAuthCheck: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    const state = api.getState() as RootState
    const refreshToken = state.auth.refreshToken

    if (!refreshToken) {
      api.dispatch(logout())
      return result
    }

    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      const tokens = refreshResult.data as {
        accessToken: string
        refreshToken: string
      }

      api.dispatch(setTokens(tokens))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }

  return result
}
