import { Button, Flex, Typography } from "antd"
import Header from "@/components/Header.tsx"
import { PlusCircleOutlined, SyncOutlined } from "@ant-design/icons"
import ProductsTable from "@/components/Table.tsx"

const Products = () => {
  return (
    <Flex vertical gap="30px">
      <Header />
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
        <ProductsTable />
      </Flex>
    </Flex>
  )
}

export default Products
