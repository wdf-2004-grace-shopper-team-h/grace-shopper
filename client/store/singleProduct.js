import axios from 'axios'
import history from '../history'

const GET_PRODUCT = 'GET_PRODUCT'

const getProduct = product => ({
  type: GET_PRODUCT,
  product
})

const defaultProduct = []

export const fetchProduct = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(getProduct(data))
  } catch (error) {
    console.error(error)
  }
}
export const deleteProduct = async id => {
  try {
    await axios.delete(`/api/products/${id}`)
    //add history push here or on front?
  } catch (error) {
    console.error(error)
  }
}
export const modifyProduct = (id, obj) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/products/${id}`, obj)
    dispatch(getProduct(data))
  } catch (error) {
    console.error(error)
  }
}

export default (state = defaultProduct, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
