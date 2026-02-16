import React from "react"
import { Button, Flex, Form, Input, InputNumber, Modal, notification } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import { useAddProductMutation } from "@/api/products.api.ts"

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

const AddProductModal: React.FC<Props> = ({ open, setOpen }) => {
  const [form] = Form.useForm()

  const [addProduct, { isLoading }] = useAddProductMutation()

  const handleOk = () => {
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
  }

  const handleFinish = () => {
    const values = form.getFieldsValue()
    addProduct({ ...values })
      .unwrap()
      .then(() => {
        notification.success({ title: "Продукт успешно добавлен! 🎉" })

        setOpen(false)
        form.resetFields()
      })
      .catch(err => {
        notification.error({
          title: "Упс, что-то пошло не так 😔",
          description: err.message,
        })
      })
  }

  return (
    <>
      <Modal
        title="Добавиление продукта"
        okText="Добавить"
        cancelText="Отменить"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={isLoading}
        footer={null}
      >
        <Form
          name="add-product"
          layout="vertical"
          autoComplete="off"
          form={form}
          onFinish={handleFinish}
        >
          <Form.Item
            label="Название"
            name="title"
            rules={[{ required: true, message: "Поле обязательно для заполнения!" }]}
          >
            <Input
              allowClear={{
                clearIcon: <CloseOutlined style={{ color: "#EDEDED" }} />,
              }}
            />
          </Form.Item>
          <Form.Item label="Описание" name="description">
            <Input.TextArea
              allowClear={{
                clearIcon: <CloseOutlined style={{ color: "#EDEDED" }} />,
              }}
            />
          </Form.Item>
          <Form.Item label="Вендор" name="brand">
            <Input
              allowClear={{
                clearIcon: <CloseOutlined style={{ color: "#EDEDED" }} />,
              }}
            />
          </Form.Item>
          <Form.Item
            label="Артикул"
            name="sku"
            rules={[{ required: true, message: "Поле обязательно для заполнения!" }]}
          >
            <Input
              allowClear={{
                clearIcon: <CloseOutlined style={{ color: "#EDEDED" }} />,
              }}
            />
          </Form.Item>
          <Form.Item
            label="Оценка"
            name="rating"
            rules={[{ required: true, message: "Поле обязательно для заполнения!" }]}
          >
            <InputNumber controls={false} min={0} max={5} />
          </Form.Item>
          <Form.Item
            label="Цена, ₽"
            name="price"
            rules={[{ required: true, message: "Поле обязательно для заполнения!" }]}
          >
            <InputNumber controls={false} min={0} />
          </Form.Item>
          <Flex gap={5} justify="end">
            <Button onClick={handleCancel}>Отменить</Button>
            <Button type="primary" htmlType="submit">
              Добавить
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  )
}

export default AddProductModal
