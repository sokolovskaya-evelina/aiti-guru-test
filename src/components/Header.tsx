import React from "react"
import { Flex, Input, Typography } from "antd"
import { SearchOutlined } from "@ant-design/icons"

type Props = {
  searchValue: string
  setSearchValue: (value: string) => void
}

const Header: React.FC<Props> = ({ searchValue, setSearchValue }) => {
  return (
    <Flex align="center" className="mt-5 gap-14 bg-white px-7.5 py-6.5">
      <Typography.Title className="m-0 whitespace-nowrap" level={3}>
        Продукты
      </Typography.Title>
      <Input
        variant="filled"
        prefix={<SearchOutlined style={{ color: "#999999" }} />}
        placeholder="Найти"
        className="max-h-12 max-w-255.75"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
    </Flex>
  )
}

export default Header
