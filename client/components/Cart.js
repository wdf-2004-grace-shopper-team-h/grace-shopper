import React from 'react'
import {fetchCart, deleteItemFromDb, updateQtyInCart} from '../store/cart'
import {
  fetchGuestCart,
  updateQtyInGuestCart,
  deleteGuestItem
} from '../store/guestCart'
import {connect} from 'react-redux'
import ProductsTray from './ProductsTray'
import GuestProductTray from './GuestProductsTray'

//import fetchCart from '../store/'
class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickDel = this.handleClickDel.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleOnClick = () => event => {
    this.props.history.push('/checkout')
  }
  handleClickDel = async event => {
    event.preventDefault()
    const productId = Number(event.target.parentElement.parentElement.id)
    if (this.props.user.id) {
      await this.props.deleteItemFromDb(productId)
      this.forceUpdate()
    } else {
      this.props.deleteGuestItem(productId)
    }
  }

  handleChange = async event => {
    const qty = Number(event.target.value)
    const productId = Number(event.target.parentElement.parentElement.id)
    const orderId = event.target.id
    if (this.props.user.id) {
      this.props.updateQtyInCart(productId, qty, orderId)
    } else {
      await this.props.updateQtyInGuestCart(productId, qty)
      this.forceUpdate()
    }
  }

  async componentDidMount() {
    if (this.props.user.id) {
      await this.props.fetchCart()
    } else {
      await this.props.fetchGuestCart()
    }
  }
  render() {
    if (this.props.user.id) {
      return this.props.cart.products ? (
        <ProductsTray
          order={this.props.cart}
          handleChange={this.handleChange}
          handleClickDel={this.handleClickDel}
        />
      ) : (
        <div> Nothing here! Check out our selection :D </div>
      )
    } else {
      return this.props.cart.length ? (
        <GuestProductTray
          order={this.props.cart}
          handleChange={this.handleChange}
          handleClickDel={this.handleClickDel}
        />
      ) : (
        <div> Nothing here! Check out our selection :D </div>
      )
    }
  }
}
const mapState = state => ({
  cart: state.cart,
  user: state.user,
  guestCart: state.guestCart
})
const mapDispatch = dispatch => ({
  fetchCart: () => dispatch(fetchCart()), //needs to change to accomodate the current user logged in.
  fetchGuestCart: () => dispatch(fetchGuestCart()),
  updateQtyInCart: (productId, userQty) =>
    dispatch(updateQtyInCart(productId, userQty)),
  updateQtyInGuestCart: (productId, guestUserQty) =>
    dispatch(updateQtyInGuestCart(productId, guestUserQty)),
  deleteItemFromDb: productId => dispatch(deleteItemFromDb(productId)),
  deleteGuestItem: productId => dispatch(deleteGuestItem(productId))
})
export default connect(mapState, mapDispatch)(Cart)
