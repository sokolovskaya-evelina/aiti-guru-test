import { createBrowserRouter } from "react-router-dom"
import Auth from "@/pages/auth/Auth.tsx"
import { ProtectedRoute } from "@/app/ProtectedRoute.tsx"
import Products from "@/pages/products/Products.tsx"

export const router = createBrowserRouter([
  { path: "/login", element: <Auth /> },
  {
    element: <ProtectedRoute />,
    children: [{ path: "/", element: <Products /> }],
  },
])
