import React, { useMemo, useState } from "react"
import type { TableProps } from "antd"
import { type PaginationProps, Table, Typography } from "antd"
import { type Product, type ProductsOutput } from "@/api/products.api.ts"
import type { SorterResult } from "antd/es/table/interface"
import { tableConfig } from "@/utils/products-table-config.tsx"

type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"]

type Props = {
  isLoading: boolean
  data?: ProductsOutput
  setSortBy: (value: SorterResult<keyof Product>["field"]) => void
  setOrder: (value: SorterResult<"ascend" | "descend">["order"]) => void
  setSkip: (value: number) => void
  sortBy?: SorterResult<keyof Product>["field"]
  order?: SorterResult<"ascend" | "descend">["order"]
}

const ProductsTable: React.FC<Props> = ({
  isLoading,
  data,
  setSortBy,
  setSkip,
  setOrder,
  sortBy,
  order,
}) => {
  const config = useMemo(() => tableConfig({ sortBy, order }), [sortBy, order])

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

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
    <Table<Product>
      {...config}
      rowSelection={rowSelection}
      loading={isLoading}
      dataSource={data?.products ?? []}
      onChange={handleTableChange}
      scroll={{ x: "max-content" }}
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
  )
}

export default ProductsTable
