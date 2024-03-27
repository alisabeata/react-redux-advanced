import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartIsVisible: false,
  notification: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  // must not contain the side effects like fetch etc
  // must be pure functions
  reducers: {
    toggle(state) {
      // it's allowed to mutate state here
      // redux toolkit uses immer for updating state immutably
      // working with the methods of state
      // replacee the as state = ... is forbidden

      state.cartIsVisible = !state.cartIsVisible
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      }
    },
    hideNotification(state) {
      state.notification = null
    },
  },
})

export const uiActions = uiSlice.actions

export default uiSlice.reducer
