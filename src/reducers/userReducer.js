import { createSlice } from '@reduxjs/toolkit'
import loginService from './../services/login'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
      set(state, action) {
        return action.payload
      }
    }
})

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch(userSlice.actions.set(user))
  } catch (e) {
    if (e || e.response.status == 401) {
      dispatch(setNotification('User or password not valid', 5, true))
    }
  }
}
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(userSlice.actions.set({}))
  }
}

export const retreiveUser = () => {
  return dispatch => {
    const loggedUserString = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserString) {
      dispatch(userSlice.actions.set(JSON.parse(loggedUserString)))
    }
  }
}

export default userSlice.reducer