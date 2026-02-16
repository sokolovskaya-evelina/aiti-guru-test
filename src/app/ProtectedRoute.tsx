import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store.ts"

export const ProtectedRoute = () => {
  const token = useSelector((s: RootState) => s.auth.accessToken)
  return token ? <Outlet /> : <Navigate to="/login" replace />
}
