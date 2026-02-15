import {
  type BaseQueryFn,
  type FetchArgs,
  fetchBaseQuery,
  type FetchBaseQueryError,
  retry,
} from "@reduxjs/toolkit/query"

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
  { maxRetries: 0 }
)

export const baseQueryWithAuthCheck: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  return result
}
