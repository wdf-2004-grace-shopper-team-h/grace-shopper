import axios from 'axios'
import history from '../history'

export const GET_ITEMS_IN_CART = 'GET_ITEMS_IN_CART'
export const ADD_TO_CART = 'ADD_TO_CART'
export const UPDATE_ITEM_IN_CART = 'UPDATE_ITEM_IN_CART'

export const getItems = items => ({
  type: GET_ITEMS_IN_CART,
  items
})

export const updateItemInCart = (productId, userQuantity) => ({
  type: UPDATE_ITEM_IN_CART,
  itemId: productId,
  userQuantity
})

export const addItemToCart = productId => ({
  type: ADD_TO_CART,
  itemId: productId
})

const defaultItems = {}
//what is this trying to get?
//to get the cart  with all items in it when a user gets to their cart page. it should display all items.
export const fetchCart = () => async dispatch => {
  //will change to accomodate user logged in or not.
  try {
    const {data} = await axios.get(`/api/cart`)
    dispatch(getItems(data))
  } catch (error) {
    console.error(error)
  }
}

export const pushProduct = (productId, numberOfItems) => async (
  dispatch,
  getState
) => {
  try {
    await axios.post('/api/cart', {productId, numberOfItems})
    history.push('/cart')
  } catch (error) {
    console.error(error)
  }
}

//will grab the id from the product and user quantity on the react end to send here and update the database cart model to include the new item.
export const updateQtyInCart = (
  productId,
  userQuantity,
  orderId
) => async dispatch => {
  try {
    await axios.put(`/api/cart/${productId}`, {userQuantity, orderId})
    dispatch(updateItemInCart(productId, userQuantity))
    history.push('/cart')
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
    case UPDATE_ITEM_IN_CART:
      const newList = state.products.map(product => {
        if (product.id == action.itemId) {
          product.numberOfItems = action.userQuantity
        }
        return product
      })

      return {
        ...state,
        products: [...newList],
        order_products: {
          ...state.order_products,
          numberOfItems: action.userQuantity
        }
      }
    default:
      return state
  }
}
