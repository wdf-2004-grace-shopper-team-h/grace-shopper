import React from 'react'
import {fetchCart} from '../store/cart'
import {connect} from 'react-redux'
import ProductsTray from './ProductsTray'
//import fetchCart from '../store/'
class Cart extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // const id = this.props.user.id
    // if (id) fetchCart(id)
    // else if (localStorage.getItem('cart'))
    //   getCart(JSON.parse(localStorage.getItem('cart')))
    this.props.fetchCart()
  }
  render() {
    return this.props.cart.length ? (
      <ProductsTray order={this.props.cart} />
    ) : (
      <div />
    )
  }
}
const mapState = state => ({
  cart: state.cart
})
const mapDispatch = dispatch => ({
  fetchCart: () => dispatch(fetchCart())
  //getCArt: cart => dispatch(getCArt(cart))
})
export default connect(mapState, mapDispatch)(Cart)
