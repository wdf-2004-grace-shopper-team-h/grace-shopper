import axios from 'axios'
import history from '../history'

const GET_ORDER = 'GET_ORDER'

const getOrder = order => ({
  type: GET_ORDER,
  order
})

export const fetchOrder = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${id}`)

    dispatch(getOrder(data))
  } catch (error) {
    console.error(error)
  }
}
const defaultState = {}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    default:
      return state
  }
}
