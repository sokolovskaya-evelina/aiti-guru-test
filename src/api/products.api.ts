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

export type ProductsOutput = {
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

type ProductSearchInput = {
  params?: {
    q?: string
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
    searchProducts: build.query<ProductsOutput, ProductSearchInput>({
      query: ({ params }) => ({
        url: "/products/search",
        method: "GET",
        params,
      }),
    }),
  }),
})
export const { useGetProductsQuery, useSearchProductsQuery } = productsApi
