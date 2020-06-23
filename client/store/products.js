import axios from 'axios'
import history from '../history'

const GET_PRODUCTS = 'GET_PRODUCTS'

const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

const defaultProducts = []

export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  } catch (error) {
    console.error(error)
  }
}

export default (state = defaultProducts, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
