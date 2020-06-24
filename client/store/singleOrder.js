import axios from 'axios'

const GET_ORDER = 'GET_ORDER'

export const getOrder = order => ({
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
const defaultOrder = {}

export default (state = defaultOrder, action) => {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    default:
      return state
  }
}
