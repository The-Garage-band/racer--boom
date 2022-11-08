/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from '@/API/Auth'
import type { RootState } from '../store'
import { fetchUser } from '../reducers/ActionCreatorGetUser'

export interface IGetUserState {
  isLoading: boolean
  data: IUser
  error: string
}

const initialState: IGetUserState = {
  isLoading: true,
  data: {
    id: 0,
    display_name: '',
    avatar: '',
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
  },
  error: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false
      state.data = action.payload
      state.error = ''
    },
    [fetchUser.pending.type]: (state: IGetUserState) => {
      state.isLoading = true
    },
    [fetchUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const getUserData = (state: RootState) => state.user
export default fetchUser
