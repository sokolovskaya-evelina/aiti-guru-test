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

export const productsApi = rootApi.enhanceEndpoints({ addTagTypes: ["Product"] }).injectEndpoints({
  endpoints: build => ({
    getProducts: build.query<ProductsOutput, ProductInput>({
      query: ({ params }) => ({
        url: "/products",
        method: "GET",
        params,
      }),
      providesTags: ["Product"],
    }),
    searchProducts: build.query<ProductsOutput, ProductSearchInput>({
      query: ({ params }) => ({
        url: "/products/search",
        method: "GET",
        params,
      }),
    }),
    addProduct: build.mutation<
      Product,
      Pick<Product, "title" | "description" | "brand" | "sku" | "rating" | "price">
    >({
      query: product => ({
        url: "/products/add",
        method: "POST",
        body: product,
      }),
      invalidatesTags: () => ["Product"],
    }),
  }),
})

export const { useGetProductsQuery, useSearchProductsQuery, useAddProductMutation } = productsApi
