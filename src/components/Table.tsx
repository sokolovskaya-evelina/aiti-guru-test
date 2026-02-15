import React, { useState } from "react"
import { Button, Flex, Table, Typography } from "antd"
import type { TableColumnsType, TableProps } from "antd"
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons"

type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"]

interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Наименование",
    dataIndex: "name",
    render: (_, record) => (
      <Flex gap="18px" align="center">
        <div className="h-12 w-12 rounded-lg bg-[#C4C4C4]" />
        <Flex vertical className="whitespace-nowrap">
          <Typography.Text strong>{record.name}</Typography.Text>
          <Typography.Text type="secondary">{record.name}</Typography.Text>
        </Flex>
      </Flex>
    ),
  },
  {
    title: "Вендор",
    dataIndex: "age",
    align: "center",
    render: value => <Typography.Text strong>{value}</Typography.Text>,
  },
  {
    title: "Артикул",
    dataIndex: "address",
    align: "center",
  },
  {
    title: "Оценка",
    dataIndex: "address",
    align: "center",
  },
  {
    title: "Цена, ₽",
    dataIndex: "address",
    align: "center",
  },
  {
    title: "",
    key: "action",
    render: () => (
      <Flex gap="32px">
        <Button shape="round" type="primary">
          <PlusOutlined />
        </Button>
        <Button shape="circle">
          <EllipsisOutlined />
        </Button>
      </Flex>
    ),
  },
]

const dataSource = Array.from({ length: 46 }).map<DataType>((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}))

const ProductsTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  return (
    <Table<DataType>
      footer={() => {
        const pageSize = 10
        const current = 1
        const from = (current - 1) * pageSize + 1
        const to = Math.min(current * pageSize, 100)

        return (
          <Typography.Text type="secondary">
            Показано <Typography.Text>{from}</Typography.Text>-
            <Typography.Text>{to}</Typography.Text> из <Typography.Text>100</Typography.Text>
          </Typography.Text>
        )
      }}
      pagination={{
        size: "large",
        total: 100,
        showSizeChanger: false,
        position: ["bottomRight"],
      }}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource}
    />
  )
}

export default ProductsTable
