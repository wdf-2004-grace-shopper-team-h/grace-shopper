import axios from 'axios'
import history from '../history'
import {getItems, GET_ITEMS_IN_CART} from './cart'
const ADD_TO_GUEST_CART = 'ADD_TO_GUEST_CART'
export const UPDATE_ITEM_IN_GUEST_CART = 'UPDATE_ITEM_IN_GUEST_CART'

export const addItemToGuestCart = (productId, numOfItems) => ({
  type: ADD_TO_GUEST_CART,
  item: {
    itemId: productId,
    numOfItems
  }
})

export const updateQtyInGuestCart = (productId, userQuantity) => ({
  type: UPDATE_ITEM_IN_GUEST_CART,
  itemId: productId,
  userQuantity
})

export const fetchGuestCart = () => async (dispatch, getState) => {
  try {
    //console.log(getState().guestCart);
    let productIds = getState().guestCart.map(el => el.itemId)
    const {data} = await axios.get(`/api/cart`, {params: {productIds}})
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      data[i].numberOfItems = getState().guestCart[i].numOfItems
    }
    dispatch(getItems(data))
    history.push('/cart')
  } catch (error) {
    console.error(error)
  }
}

const guestCart = []

export default (state = guestCart, action) => {
  switch (action.type) {
    case ADD_TO_GUEST_CART:
      console.log(state.find(el => el.itemId === action.item.itemId))
      if (state.find(el => el.itemId === action.item.itemId)) {
        const updatedGuestCart = state.map(el => {
          if (el.itemId === action.item.itemId) {
            el.numOfItems += action.item.numOfItems
          }
          return el
        })
        return [...updatedGuestCart]
      }
      return [...state, action.item]
    case UPDATE_ITEM_IN_GUEST_CART:
      let newList = state.map(product => {
        if (product.id === action.itemId) {
          product.numberOfItems = action.numberOfItems
        }
        return product
      })
      return [...newList]
    default:
      return state
  }
}
