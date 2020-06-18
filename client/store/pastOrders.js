import axios from 'axios'

const GET_PAST_ORDERS = 'GET_PAST_ORDERS'

const getPastOrders = orders ({
    type: GET_PAST_ORDERS,
    orders
})

export const fetchPastOrders = id => async dispatch => {
    try {
        const { data } = axios.get(`/api/orders/:${id}`)
        dispatch(getPastOrders(data))
    } catch (error) {
        console.log(error)
    }
}

export default (state = [], action) => {
    switch(action.type) {
        case GET_PAST_ORDERS:
            return action.orders
        default:
            return state
    }
}