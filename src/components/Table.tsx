import React, { useEffect, useMemo, useState } from "react"
import type { TableProps } from "antd"
import { notification, type PaginationProps, Table, Typography } from "antd"
import { type Product, useGetProductsQuery } from "@/api/products.api.ts"
import type { SorterResult } from "antd/es/table/interface"
import { tableConfig } from "@/utils/products-table-config.tsx"

type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"]

const ProductsTable: React.FC = () => {
  const [api, contextHolder] = notification.useNotification()
  const config = useMemo(() => tableConfig(), [])

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [sortBy, setSortBy] = useState<SorterResult<keyof Product>["field"]>()
  const [order, setOrder] = useState<SorterResult<"ascend" | "descend">["order"]>()
  const [skip, setSkip] = useState<number>(0)

  const { data, error, isLoading } = useGetProductsQuery({
    params: {
      limit: 20,
      skip,
      sortBy: sortBy as keyof Product,
      order: (order === "ascend" && "asc") || (order === "descend" && "desc") || undefined,
    },
  })

  useEffect(() => {
    if (error) {
      api.error({
        title: "Упс, что-то пошло не так 😔",
        description: "Попробуйте ещё раз",
      })
    }
  }, [error])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection: TableRowSelection<Product> = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const onChange: PaginationProps["onChange"] = page => {
    setSkip(page * 20 - 20)
  }

  const handleTableChange: TableProps<Product>["onChange"] = (_, __, sorter) => {
    setSortBy(Array.isArray(sorter) ? undefined : sorter.field)
    setOrder(Array.isArray(sorter) ? undefined : sorter.order)
  }

  return (
    <>
      {contextHolder}
      <Table<Product>
        {...config}
        rowSelection={rowSelection}
        loading={isLoading}
        dataSource={data?.products ?? []}
        onChange={handleTableChange}
        pagination={{
          size: "large",
          total: data?.total,
          defaultPageSize: 20,
          showSizeChanger: false,
          position: ["bottomRight"],
          onChange: onChange,
          showTotal: (total, range) => (
            <Typography.Text type="secondary">
              Показано{" "}
              <Typography.Text>
                {range[0]}-{range[1]}
              </Typography.Text>{" "}
              из <Typography.Text>{total}</Typography.Text>
            </Typography.Text>
          ),
        }}
      />
    </>
  )
}

export default ProductsTable
