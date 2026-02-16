import { rootApi } from "@/utils/rootApi.ts"
import { setTokens } from "@/store/auth.slice.ts"

export type LoginRequest = {
  username: string
  password: string
  expiresInMins?: number
}

export type LoginResponse = {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
  accessToken: string
  refreshToken: string
}

export type User = Omit<LoginResponse, "accessToken" | "refreshToken">

export type RefreshResponse = {
  accessToken: string
  refreshToken: string
}

export const authApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: body => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            setTokens({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            })
          )
        } catch (e) {
          console.log(e)
        }
      },
    }),

    me: builder.query<User, void>({
      query: () => "/auth/me",
    }),

    refresh: builder.mutation<RefreshResponse, { refreshToken: string }>({
      query: body => ({
        url: "/auth/refresh",
        method: "POST",
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
