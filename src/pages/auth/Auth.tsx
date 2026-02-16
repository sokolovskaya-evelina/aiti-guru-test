import { Button, Card, Checkbox, Divider, Flex, Form, Input, Typography } from "antd"
import {
  CloseOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons"
import Logo from "@/components/Logo.tsx"
import { useLoginMutation } from "@/api/auth.api.ts"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setRemember } from "@/store/auth.slice.ts"
import { persistor } from "@/store/store.ts"

const Auth = () => {
  const [form] = Form.useForm()

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleFinish = async () => {
    const values = form.getFieldsValue()
    const res = await login({ username: values.username, password: values.password }).unwrap()

    dispatch(setRemember(values.remember))

    if (!values.remember) {
      persistor.pause()
      await persistor.flush()
      await persistor.purge()
      persistor.persist()
    }

    if (res.accessToken) {
      navigate("/", { replace: true })
    }
  }
  return (
    <div className="w-screen">
      <Flex vertical align="center" justify="center" className="min-h-svh w-full">
        <Card className="p-6">
          <div className="flex justify-center">
            <Logo />
          </div>
          <Card.Meta
            className="mt-8 mb-8 text-center"
            title={<Typography.Title className="mb-1.5">Добро пожаловать!</Typography.Title>}
            description="Пожалуйста, авторизируйтесь"
          />
          <Form
            name="login"
            layout="vertical"
            form={form}
            onFinish={handleFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Логин"
              name="username"
              rules={[{ required: true, message: "Поле обязательно для заполнения!" }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "#EDEDED" }} />}
                allowClear={{
                  clearIcon: <CloseOutlined style={{ color: "#EDEDED" }} />,
                }}
              />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: "Поле обязательно для заполнения!" }]}
            >
              <Input.Password
                iconRender={visible =>
                  visible ? (
                    <EyeOutlined style={{ color: "#EDEDED" }} />
                  ) : (
                    <EyeInvisibleOutlined style={{ color: "#EDEDED" }} />
                  )
                }
                prefix={<LockOutlined style={{ color: "#EDEDED" }} />}
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" label={null}>
              <Checkbox>Запомнить данные</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
              <Button loading={isLoading} className="w-full" type="primary" htmlType="submit">
                Войти
              </Button>
            </Form.Item>
            <Divider>
              <Typography.Text type="secondary">или</Typography.Text>
            </Divider>
            <Flex justify="center" gap={4}>
              <Typography.Text>Нет аккаунта?</Typography.Text>
              <Typography.Link underline>Создать</Typography.Link>
            </Flex>
          </Form>
        </Card>
      </Flex>
    </div>
  )
}

export default Auth
