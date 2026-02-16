import Typography from "antd/es/typography"
import type { Product } from "@/api/products.api.ts"
import { Button, Empty, Flex, type TableProps } from "antd"
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons"
import type { SorterResult } from "antd/es/table/interface"

export function tableConfig({
  sortBy,
  order,
}: {
  sortBy?: SorterResult<keyof Product>["field"]
  order?: SorterResult<"ascend" | "descend">["order"]
}): NonNullable<Partial<TableProps<Product>>> {
  return {
    rowKey: product => product.id,
    columns: [
      {
        title: "Наименование",
        dataIndex: "title",
        width: 300,
        render: (_, record) => (
          <Flex gap="18px" align="center">
            <div className="h-12 w-12 rounded-lg bg-[#C4C4C4]" />
            <Flex vertical>
              <Typography.Text strong>{record.title}</Typography.Text>
              <Typography.Text
                ellipsis={{ tooltip: record.description }}
                className="max-w-75"
                type="secondary"
              >
                {record.description}
              </Typography.Text>
            </Flex>
          </Flex>
        ),
      },
      {
        title: "Вендор",
        dataIndex: "brand",
        align: "center",
        render: value => <Typography.Text strong>{value}</Typography.Text>,
      },
      {
        title: "Артикул",
        dataIndex: "sku",
        align: "center",
      },
      {
        title: "Оценка",
        dataIndex: "rating",
        align: "center",
        sorter: true,
        sortOrder: sortBy === "rating" ? order : undefined,
        render: value => (
          <Typography.Text>
            <Typography.Text type={value < 3 ? "danger" : undefined}>{value}</Typography.Text> / 5
          </Typography.Text>
        ),
      },
      {
        title: "Цена, ₽",
        dataIndex: "price",
        align: "center",
        sorter: true,
        sortOrder: sortBy === "price" ? order : undefined,
        render: value => (
          <Typography.Text>
            {Math.trunc(value)}
            <Typography.Text type="secondary">
              .{value.toString().match(/\.(\d{1,3})/)[1]}
            </Typography.Text>
          </Typography.Text>
        ),
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
    ],
    locale: { emptyText: <Empty description="Нет данных" /> },
  }
}
