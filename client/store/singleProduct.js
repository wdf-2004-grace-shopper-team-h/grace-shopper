import axios from 'axios'
import history from '../history'

//action----------------------------------------
const GET_PRODUCT = 'GET_PRODUCT'

//action creator--------------------------------
const getProduct = product => ({
  type: GET_PRODUCT,
  product
})

//thunk-----------------------------------------

//returns object of product by id and dispatchs it
export const fetchProduct = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(getProduct(data))
  } catch (error) {
    console.error(error)
  }
}
//modifies product in db. accepts id of product and object of a product, then sends it to api
export const modifyProduct = (id, obj) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/products/${id}`, obj)
    dispatch(getProduct(data))
  } catch (error) {
    console.error(error)
  }
}
//creates new product by object of product from react component
//for correct redirect returns id of new product
export const addProduct = async obj => {
  try {
    const {data} = await axios.post('/api/products/', obj)
    return data
  } catch (error) {
    console.error(error)
  }
}
//delete product by id from db
export const deleteProduct = async id => {
  try {
    await axios.delete(`/api/products/${id}`)
  } catch (error) {
    console.error(error)
  }
}

//initial state------------------------------
const defaultProduct = []

//reducer------------------------------------
export default (state = defaultProduct, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
