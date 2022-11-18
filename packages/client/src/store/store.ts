import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { loginSlice } from './slices/GetLoginStatusSlice'
import { userSlice } from './slices/GetUserSlice'
import { alertSlice } from './slices/GetAlertSlice'

const rootReducer = combineReducers({
  login: loginSlice.reducer,
  user: userSlice.reducer,
  alert: alertSlice.reducer
})

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
