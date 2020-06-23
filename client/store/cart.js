import axios from 'axios'
import history from '../history'
import {setNumItems} from './numberOfItems'

const GET_ITEMS_IN_CART = 'GET_ITEMS_IN_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export const deleteItem = productId => ({
  type: REMOVE_FROM_CART,
  itemId: productId
})
export const getItems = items => ({
  type: GET_ITEMS_IN_CART,
  items
})

// export const addItemToCart = (productId, numberOfItems) => ({
//   type: ADD_TO_CART,
//   item: {
//     itemId: productId,
//     numberOfItems
//   }
// })

export const addItemToCart = productId => ({
  type: ADD_TO_CART,
  itemId: productId
})

//what is this trying to get?
//to get the cart  with all items in it when a user gets to their cart page. it should display all items.
export const fetchCart = () => async dispatch => {
  //will change to accomodate user logged in or not.
  try {
    // console.log('checking user',req.session.userId)
    const {data} = await axios.get(`/api/cart`)
    dispatch(getItems(data))
  } catch (error) {
    console.error(error)
  }
}

export const pushProduct = productId => async (dispatch, getState) => {
  try {
    const numberOfItems = getState().numberOfItems
    dispatch(setNumItems(1))
    await axios.post('/api/cart', {productId, numberOfItems})
    history.push('/cart')
  } catch (error) {
    console.error(error)
  }
}

//will grab the id from the product and user quantity on the react end to send here and update the database cart model to include the new item.
export const updateQtyInCart = (productId, userQuantity) => async dispatch => {
  try {
    await axios.put(`/api/cart/${productId}`, userQuantity)
    dispatch(addItemToCart(productId, userQuantity))
  } catch (error) {
    console.error(error)
  }
}

export const deleteItemFromDb = productId => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/cart/delete/${productId}`)
    dispatch(deleteItem(productId))
    history.push('/cart')
  } catch (error) {
    console.error(error)
  }
}

const defaultItems = {}

export default (state = defaultItems, action) => {
  switch (action.type) {
    case GET_ITEMS_IN_CART:
      return action.items
    case ADD_TO_CART:
      return [...state, action.item]
    case REMOVE_FROM_CART:
      const newState = {...state, products: [...state.products]}
      // console.log('state dispatched',action.productId)
      const newListOfProducts = newState.products.filter(product => {
        console.log('actionId', action.itemId)
        return product.id !== action.itemId
      })
      console.log(newListOfProducts, newState.products)
      return {...state, products: [...newListOfProducts]}
    default:
      return state
  }
}
