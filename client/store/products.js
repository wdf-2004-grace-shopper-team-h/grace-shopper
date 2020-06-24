import axios from 'axios'
import history from '../history'

//action----------------------------------------
const GET_PRODUCTS = 'GET_PRODUCTS'

//action creator--------------------------------
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

//thunk-----------------------------------------

//returns array of all product from db
export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  } catch (error) {
    console.error(error)
  }
}

//initial state--------------------------------
const defaultProducts = []

//reducer--------------------------------------
export default (state = defaultProducts, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
