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
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled.type, (state, action: PayloadAction<IUser>) => {
      return {...state, isLoading: false, data: action.payload, error: ''};
    })
    builder.addCase(fetchUser.pending.type, (state: IGetUserState) => {
      return {...state, isLoading: true};
    })
    builder.addCase(fetchUser.rejected.type, (state, action: PayloadAction<string>) => {
      return {...state, isLoading: false, error: action.payload};
    })
  },
})

export const getUserData = (state: RootState) => state.user
export default fetchUser
