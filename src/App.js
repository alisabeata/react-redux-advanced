import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'
import Notification from './components/Utils/Notification'
import { sendCartData, fetchCartData } from './store/cartSlice'

let isInitiated = true

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible)
  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity)
  const cartItems = useSelector((state) => state.cart.items)
  const notification = useSelector((state) => state.ui.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(() => {
    // prevent sending data on the first run
    if (isInitiated) {
      isInitiated = false
      return
    }

    dispatch(
      sendCartData({ totalQuantity: cartTotalQuantity, items: cartItems }),
    )
  }, [cartTotalQuantity, cartItems, dispatch])

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  )
}

export default App
