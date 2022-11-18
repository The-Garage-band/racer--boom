/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

import type { IAlert } from '@/components/Alert';

const initialState: IAlert = {
  message: '',
  duration: 3000,
  type: 'success'
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    addAlert: (state, {payload}) => {
      state.message = payload.message
      state.duration = payload.duration ? payload.duration : initialState.duration
      state.type = payload.type ? payload.type : initialState.type
    },
    removeAlert: (state) => {
      state.message = ''
    }
  },
})

export const getAlertState = (state: RootState) => state.alert
export const { addAlert } = alertSlice.actions
export default alertSlice.reducer