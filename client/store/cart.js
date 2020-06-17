import axios from 'axios'
const GET_CART = 'GET_CART'
const getCart = cart => ({
  type: GET_CART,
  cart
})
const fetchCart = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart/${id}`)
    dispatch(getCart(data))
  } catch (error) {
    console.error(error)
  }
}
export default (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
