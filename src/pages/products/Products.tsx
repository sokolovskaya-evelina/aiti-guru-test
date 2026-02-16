import { Button, Flex, notification, Typography } from "antd"
import Header from "@/components/Header.tsx"
import { PlusCircleOutlined, SyncOutlined } from "@ant-design/icons"
import ProductsTable from "@/components/Table.tsx"
import { useEffect, useMemo, useState } from "react"
import { type Product, useGetProductsQuery, useSearchProductsQuery } from "@/api/products.api.ts"
import type { SorterResult } from "antd/es/table/interface"
import { useDebounce } from "@/utils/hooks/useDebounce.ts"
import { skipToken } from "@reduxjs/toolkit/query"
import { usePersistedState } from "@/utils/hooks/usePersistedState.ts"

const Products = () => {
  const [api, contextHolder] = notification.useNotification()

  const [searchValue, setSearchValue] = useState<string>("")
  const [skip, setSkip] = useState<number>(0)

  const [sortBy, setSortBy] = usePersistedState(
    "sortBy",
    undefined as SorterResult<keyof Product>["field"]
  )
  const [order, setOrder] = usePersistedState(
    "order",
    undefined as SorterResult<"ascend" | "descend">["order"]
  )

  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery({
    params: {
      limit: 20,
      skip,
      sortBy: sortBy as keyof Product,
      order: (order === "ascend" && "asc") || (order === "descend" && "desc") || undefined,
    },
  })

  const searchParams = useMemo(() => {
    return { params: { q: searchValue } }
  }, [searchValue])
  const debouncedRequest = useDebounce(searchParams)

  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
  } = useSearchProductsQuery(searchValue.length > 0 ? debouncedRequest : skipToken)

  const showSearchResults = useMemo(() => {
    return searchValue.length > 0
  }, [searchValue])

  useEffect(() => {
    if (productsError && searchError) {
      api.error({
        title: "Упс, что-то пошло не так 😔",
        description: "Попробуйте ещё раз",
      })
    }
  }, [productsError, searchError])

  return (
    <Flex vertical gap="30px">
      {contextHolder}
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <Flex vertical gap="40px" className="bg-white p-7.5">
        <Flex justify="space-between" align="center">
          <Typography.Title level={4} className="m-0">
            Все позиции
          </Typography.Title>
          <Flex gap="8px">
            <Button>
              <SyncOutlined />
            </Button>
            <Button type="primary" icon={<PlusCircleOutlined />}>
              Добавить
            </Button>
          </Flex>
        </Flex>
        <ProductsTable
          data={showSearchResults ? searchData : productsData}
          isLoading={showSearchResults ? searchLoading : productsLoading}
          setSkip={setSkip}
          setSortBy={setSortBy}
          setOrder={setOrder}
          sortBy={sortBy}
          order={order}
        />
      </Flex>
    </Flex>
  )
}

export default Products
