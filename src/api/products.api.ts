import { rootApi } from "@/utils/rootApi.ts"

export type Product = {
  id: number
  title: string
  description: string
  brand: string
  sku: string
  price: number
  rating: number
}

type ProductsOutput = {
  products: Product[]
  limit: number
  skip: number
  total: number
}

type ProductInput = {
  params?: {
    limit: number
    sortBy?: keyof Product
    order?: "asc" | "desc"
    skip: number
  }
}

export const productsApi = rootApi.injectEndpoints({
  endpoints: build => ({
    getProducts: build.query<ProductsOutput, ProductInput>({
      query: ({ params }) => ({
        url: "/products",
        method: "GET",
        params,
      }),
    }),
  }),
})
export const { useGetProductsQuery } = productsApi
