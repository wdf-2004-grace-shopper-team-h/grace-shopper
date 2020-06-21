import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import cart from './cart'

//Adding local storage to the redux store
function saveToLocalStorage(state) {
  const serializedState = JSON.stringify(state)
  localStorage.setItem('state', serializedState)
}

function loadFromLocalStorage() {
  const serializedState = localStorage.getItem('state')
  if (serializedState === null) return undefined
  return JSON.parse(serializedState)
}

const persistedState = loadFromLocalStorage()
const reducer = combineReducers({user, products, cart})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, persistedState, middleware)
store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
export * from './user'
