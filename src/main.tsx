import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { StyleProvider } from "@ant-design/cssinjs"
import { ConfigProvider } from "antd"
import { Provider } from "react-redux"
import { store } from "@/store/store.ts"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <StyleProvider layer>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#242edb",
              colorInfo: "#242edb",
              colorText: "#232323",
              colorError: "#F11010",
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
              Table: {
                headerBg: "#FFFFFF",
                headerColor: "#9C9C9C",
                borderColor: "#EDEDED",
                rowSelectedBg: "#FFFFFF",
                rowSelectedHoverBg: "#EDEDED",
                rowHoverBg: "#EDEDED",
              },
              Pagination: {
                itemActiveBg: "#797FEA",
                itemActiveColor: "#FFFFFF",
                itemActiveColorHover: "#FFFFFF",
                colorPrimaryBorder: "#797FEA",
                colorText: "#9C9C9C",
                colorPrimary: "#FFFFFF",
                colorPrimaryHover: "#FFFFFF",
              },
            },
          }}
        >
          <App />
        </ConfigProvider>
      </StyleProvider>
    </Provider>
  </StrictMode>
)
