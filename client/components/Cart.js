import React from 'react'
import {fetchCart} from '../store/cart'
import {connect} from 'react-redux'
import ProductsTray from './ProductsTray'
//import fetchCart from '../store/'
class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  handleOnClick = () => event => {
    this.props.history.push('/checkout')
  }

  componentDidMount() {
    if (window.localStorage.getItem('isLoggedIn')) {
      this.props.fetchCart()
    }

    //Needs to change when we get the correct user
  }
  render() {
    return this.props.cart.products ? (
      <ProductsTray order={this.props.cart} />
    ) : (
      <div> Nothing here! Check out our selection :D </div>
    )
  }
}
const mapState = state => ({
  cart: state.cart
})
const mapDispatch = dispatch => ({
  fetchCart: () => dispatch(fetchCart()) //needs to change to accomodate the current user logged in.
})
export default connect(mapState, mapDispatch)(Cart)
