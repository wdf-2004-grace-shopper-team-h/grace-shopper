import React from 'react'
import {fetchCart, updateQtyInCart} from '../store/cart'
import {fetchGuestCart} from '../store/guestCart'
import {connect} from 'react-redux'
import ProductsTray from './ProductsTray'
import GuestProductTray from './GuestProductsTray'
//import fetchCart from '../store/'
class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleOnClick = () => event => {
    this.props.history.push('/checkout')
  }
  handleChange = event => {
    const qty = Number(event.target.value)
    const productId = Number(event.target.parentElement.parentElement.id)
    const orderId = event.target.id
    this.props.updateQtyInCart(productId, qty, orderId)
  }

  async componentDidMount() {
    if (this.props.user.id) {
      await this.props.fetchCart()
    } else {
      await this.props.fetchGuestCart()
    }

    //Needs to change when we get the correct user
  }
  render() {
    if (this.props.user.id) {
      return this.props.cart.products ? (
        <ProductsTray
          order={this.props.cart}
          handleChange={this.handleChange}
        />
      ) : (
        <div> Nothing here! Check out our selection :D </div>
      )
    } else {
      return this.props.cart.length ? (
        <GuestProductTray order={this.props.cart} />
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
  updateQtyInCart: (productId, userQty, orderId) =>
    dispatch(updateQtyInCart(productId, userQty, orderId))
})
export default connect(mapState, mapDispatch)(Cart)
