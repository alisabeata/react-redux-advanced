import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { uiActions } from './uiSlice'

export const sendCartData = createAsyncThunk(
  'cart/send',
  // thunkAPI is the second argument
  async (cart, { dispatch }) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data',
      }),
    )

    const sendRequest = async () => {
      const response = await fetch(
        'https://react-http-9b5c3-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        {
          method: 'PUT', // PUT method is overriding the existing data
          body: JSON.stringify(cart),
        },
      )

      if (!response.ok) {
        throw new Error('Sending cart data failed.')
      }
    }

    try {
      await sendRequest()

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Done!',
          message: 'Sent cart data successfully.',
        }),
      )
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed',
        }),
      )
    }

    setTimeout(() => {
      dispatch(uiActions.hideNotification())
    }, 2000)
  },
)

export const fetchCartData = createAsyncThunk(
  'cart/fetch',
  async (_, { dispatch }) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-http-9b5c3-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
      )

      if (!response.ok) {
        throw new Error('Could not fetch cart data')
      }

      const data = await response.json()

      return data
    }

    try {
      const cartData = await fetchData()
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        }),
      )
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        }),
      )
    }

    setTimeout(() => {
      dispatch(uiActions.hideNotification())
    }, 2000)
  },
)

const initialState = {
  items: [],
  totalQuantity: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload
      const existingItem = state.items.find((item) => item.id === newItem.id)

      state.totalQuantity++

      if (!existingItem) {
        // it's allowed to mutate state here using redux-toolkit (it has the build-in immer tool here)
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        })
      } else {
        existingItem.quantity++
        existingItem.totalPrice = existingItem.totalPrice + newItem.price
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload

      const existingItem = state.items.find((item) => item.id === id)

      state.totalQuantity--

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id)
      } else {
        existingItem.quantity--
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price
      }
    },
  },
  // hanlde async logic
  extraReducers: (builder) => {
    builder.addCase(fetchCartData.fulfilled, (state, action) => {
      // 
    })
  },
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer
