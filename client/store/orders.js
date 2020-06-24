import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'

export const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})

const defaultOrders = []

export const fetchOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    dispatch(getOrders(data))
  } catch (error) {
    console.error(error)
  }
}

export default (state = defaultOrders, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
