import axios from 'axios'
import history from '../history'

const GET_ITEMS_IN_CART = 'GET_ITEMS_IN_CART';
const ADD_TO_CART = 'ADD_TO_CART';

export const getItems = items => ({
  type: GET_ITEMS_IN_CART,
  items
})

export const addItemToCart = productId => ({
  type: ADD_TO_CART,
  itemId: productId
});

const defaultItems = []

export const fetchItems = (id) => async dispatch => {
  try {
    const { data } = await axios.get(`/api/cart/${id}`);
    dispatch(getItems(data))
  } catch (error) {
    console.error(error)
  }
}



export default (state = defaultItems, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.items
    case ADD_TO_CART:
      return [...state, action.itemId]
    default:
      return state
  }
}
