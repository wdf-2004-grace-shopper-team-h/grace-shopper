import React from 'react'
import fetchCart from '../store/cart'
import {connect} from 'react-redux'
import ProductTray from './ProductTray'
//import fetchCart from '../store/'
class Cart extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const id = this.props.user.id
    if (id) fetchCart(id)
    else if (localStorage.getItem('cart'))
      getCart(JSON.parse(localStorage.getItem('cart')))
  }
  render() {
    return <ProductTray products={this.props.cart} />
  }
}
const mapState = state => ({
  cart: state.cart
})
const mapDispatch = dispatch => ({
  fetchCart: id => dispatch(fetchCart(id)),
  getCArt: cart => dispatch(getCArt(cart))
})
export default connect(mapState, mapDispatch)(Cart)
