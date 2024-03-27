import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload
      const existingItem = state.items.find((item) => item.id === newItem.id)

      if (!existingItem) {
        // it's allowed to mutate state here using redux-toolkit (it has the build-in immer tool here)
        state.items.push({
          itemId: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        })
      }
    },
    removeItemFromCart(state) {},
  },
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer
