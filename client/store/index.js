import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import cart from './cart'
import singleProduct from './singleProduct'
import guestCart from './guestCart'
import orders from './orders'
import singleOrder from './singleOrder'
//Adding local storage to the redux store

function saveToLocalStorage(cartState) {
  const serializedCart = JSON.stringify(cartState)
  localStorage.setItem('guestCart', serializedCart)
}

function loadFromLocalStorage() {
  const serializedCart = localStorage.getItem('guestCart')
  if (serializedCart === null) return undefined
  return JSON.parse(serializedCart)
}

const persistedCart = loadFromLocalStorage()
const reducer = combineReducers({
  user,
  products,
  cart,
  singleProduct,
  guestCart,
  orders,
  singleOrder
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, persistedCart, middleware)

if (!window.localStorage.getItem('isLoggedIn')) {
  console.log('User not logged in!')

  store.subscribe(() =>
    saveToLocalStorage({
      guestCart: store.getState().guestCart
    })
  )
}

export default store
export * from './user'
