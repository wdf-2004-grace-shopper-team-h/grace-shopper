import React from 'react'
import {fetchCart, deleteItemFromDb, updateQtyInCart} from '../store/cart'
import {fetchGuestCart, updateQtyInGuestCart} from '../store/guestCart'
import {connect} from 'react-redux'
import ProductsTray from './ProductsTray'
import GuestProductTray from './GuestProductsTray'
import {Link} from 'react-router-dom'

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
    const productId = event.target.parentElement.parentElement.id
    await this.props.deleteItemFromDb(productId)
    this.forceUpdate()
  }

  handleChange = event => {
    const qty = Number(event.target.value)
    const productId = Number(event.target.parentElement.parentElement.id)
    const orderId = event.target.id
    if (this.props.user.id) {
      this.props.updateQtyInCart(productId, qty, orderId)
    } else {
      this.props.updateQtyInGuestCart(productId, qty)
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
        <div>
          <ProductsTray
            order={this.props.cart}
            handleChange={this.handleChange}
            handleClickDel={this.handleClickDel}
          />
          <Link to="/checkout">
            <h4>Checkout</h4>
          </Link>
        </div>
      ) : (
        <div> Nothing here! Check out our selection :D </div>
      )
    } else {
      return this.props.cart.length ? (
        <div>
          <GuestProductTray
            order={this.props.cart}
            handleChange={this.handleChange}
            handleClickDel={this.handleClickDel}
          />
          <Link to="/checkout">
            <h4>Checkout</h4>
          </Link>
        </div>
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
  deleteItemFromDb: productId => dispatch(deleteItemFromDb(productId))
})
export default connect(mapState, mapDispatch)(Cart)
