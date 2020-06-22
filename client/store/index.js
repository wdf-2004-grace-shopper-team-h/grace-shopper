import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import cart from './cart'
import singleProduct from './singleProduct'

//Adding local storage to the redux store

function saveToLocalStorage(cart) {
  const serializedCart = JSON.stringify(cart)
  localStorage.setItem('cart', serializedCart)
}

function loadFromLocalStorage() {
  const serializedCart = localStorage.getItem('cart')
  if (serializedCart === null) return undefined
  return JSON.parse(serializedCart)
}

const persistedCart = loadFromLocalStorage()
const reducer = combineReducers({user, products, cart, singleProduct})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, persistedCart, middleware)

if (!window.localStorage.getItem('isLoggedIn')) {
  console.log('User not logged in!')

  store.subscribe(() =>
    saveToLocalStorage({
      cart: store.getState().cart
    })
  )
}

export default store
export * from './user'
