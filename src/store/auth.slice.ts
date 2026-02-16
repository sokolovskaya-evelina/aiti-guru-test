import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type User } from "@/api/auth.api.ts"

type AuthState = {
  accessToken?: string
  refreshToken?: string
  user?: User
  remember: boolean
}

const initialState: AuthState = {
  remember: true,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: state => {
      state.accessToken = undefined
      state.refreshToken = undefined
      state.user = undefined
    },
    setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    setRemember: (state, action: PayloadAction<boolean>) => {
      state.remember = action.payload
    },
  },
})

export const { logout, setTokens, setRemember } = authSlice.actions
export default authSlice.reducer
