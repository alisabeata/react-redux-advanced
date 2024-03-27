import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartIsVisible: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggle(state) {
      // it's allowed to mutate state here
      // redux toolkit uses immer for updating state immutably
      // working with the methods of state
      // replacee the as state = ... is forbidden

      state.cartIsVisible = !state.cartIsVisible
    },
  },
})

export const uiActions = uiSlice.actions

export default uiSlice.reducer
