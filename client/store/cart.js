import axios from 'axios'
//import history from '../history'

const GET_ITEMS_IN_CART = 'GET_ITEMS_IN_CART'
const ADD_TO_CART = 'ADD_TO_CART'

export const getItems = items => ({
  type: GET_ITEMS_IN_CART,
  items
})

export const addItemToCart = (productId, quantity) => ({
  type: ADD_TO_CART,
  item: {
    itemId: productId,
    quantity
  }
})

const defaultItems = []
//what is this trying to get?
//to get the cart  with all items in it when a user gets to their cart page. it should display all items.
export const fetchCart = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart`)
    dispatch(getItems(data.products))
  } catch (error) {
    console.error(error)
  }
}

//will grab the id from the product and user quantity on the react end to send here and update the database cart model to include the new item.
export const putItemInCart = (productId, userQuantity) => async dispatch => {
  try {
    await axios.put(`/api/cart/${productId}`, userQuantity)
    dispatch(addItemToCart(productId, userQuantity))
  } catch (error) {
    console.error(error)
  }
}

export default (state = defaultItems, action) => {
  switch (action.type) {
    case GET_ITEMS_IN_CART:
      return action.items
    case ADD_TO_CART:
      return [...state, action.item]
    default:
      return state
  }
}
