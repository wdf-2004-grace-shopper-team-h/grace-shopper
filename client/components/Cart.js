import React from 'react'
import {fetchCart} from '../store/cart'
import {fetchGuestCart} from '../store/guestCart'
import {connect} from 'react-redux'
import ProductsTray from './ProductsTray'
import GuestProductTray from './GuestProductsTray'
//import fetchCart from '../store/'
class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  handleOnClick = () => event => {
    this.props.history.push('/checkout')
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
        <ProductsTray order={this.props.cart} />
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
  fetchGuestCart: () => dispatch(fetchGuestCart())
})
export default connect(mapState, mapDispatch)(Cart)
