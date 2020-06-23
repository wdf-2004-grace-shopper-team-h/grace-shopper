import React from 'react'
import {fetchCart, deleteItemFromDb} from '../store/cart'
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
      console.log(window.localStorage.getItem('isLoggedIn'))
    }

    //Needs to change when we get the correct user
  }
  render() {
    return this.props.cart.products ? (
      <ProductsTray
        order={this.props.cart}
        delete={this.props.deleteItemFromDb}
      />
    ) : (
      <div> Nothing here! Check out our selection :D </div>
    )
  }
}
const mapState = state => ({
  cart: state.cart
})
const mapDispatch = dispatch => ({
  fetchCart: () => dispatch(fetchCart()), //needs to change to accomodate the current user logged in.
  deleteItemFromDb: productId => dispatch(deleteItemFromDb(productId))
  //getCArt: cart => dispatch(getCArt(cart))
})
export default connect(mapState, mapDispatch)(Cart)
