import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { StyleProvider } from "@ant-design/cssinjs"
import { ConfigProvider } from "antd"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyleProvider layer>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#242edb",
            colorInfo: "#242edb",
            colorText: "#232323",
            colorTextSecondary: "#9C9C9C",
            colorBorder: "#EDEDED",
          },
          components: {
            Input: {
              colorBorder: "rgb(237,237,237)",
              colorText: "rgb(35,35,35)",
              paddingBlock: 14,
              fontSize: 18,
              borderRadius: 12,
            },
            Checkbox: {
              colorText: "#9C9C9C",
            },
          },
        }}
      >
        <App />
      </ConfigProvider>
    </StyleProvider>
  </StrictMode>
)
