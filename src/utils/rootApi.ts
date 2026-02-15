import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithAuthCheck } from "@/utils/baseQuery.ts"

export const rootApi = createApi({
  baseQuery: baseQueryWithAuthCheck,
  endpoints: () => ({}),
})
