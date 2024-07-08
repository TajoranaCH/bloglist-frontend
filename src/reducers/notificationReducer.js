import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {},
  reducers: {
    set(state, action) {
      return {
        message: action.payload.message || '',
        type: action.payload.type || 'message'
      }
    }
  }
})

let clearingNotification = null

export const setNotification = (text, seconds, isError = false) => {
  return dispatch => {
    dispatch(notificationSlice.actions.set({ message: text, type: isError ? 'error' : 'message' }))
    if (clearingNotification) {
      clearTimeout(clearingNotification)     
    }
    clearingNotification = setTimeout(() => dispatch(notificationSlice.actions.set({message: ''})) , seconds * 1000)
  }
}

export default notificationSlice.reducer