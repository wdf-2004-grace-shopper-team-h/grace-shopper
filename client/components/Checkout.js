import React from 'react'
import {connect} from 'react-redux'
import CheckoutTray from './CheckoutTray'

export class Checkout extends React.Component {
  handleOnClickSubmit = () => async event => {
    //take ddata from cart redux store and send it to oder model.
  }

  render() {
    console.log(this.props)
    if (this.props.cart) {
      console.log(this.props.cart.products)
      const cart = this.props.cart
      const user = this.props.user
      return (
        <div className="submitContainer">
          <div className="productTray">
            <CheckoutTray cart={cart} />
          </div>
          <div className="confirmationForm">
            <form onSubmit={this.handleOnClick}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={user.name ? user.name : 'Enter your Name'}
                  required
                />
              </div>
              <div>
                <label htmlFor="Adress">Adress</label>
                <input
                  type="Adress"
                  id="adress"
                  name="adress"
                  placeholder={user.adress ? user.adress : 'Enter your Adress'}
                  required
                />
              </div>
              <button type="submit">Confirm Order</button>
              {/* when order confirmed take data from cart(using redux) send it to api order(use magic methods),after clean the cart db and cart redux store 
            -fetch data from redux
            -create new order
            -using magick methods add products
            -clean db cart
            -clean redux store cart*/}
            </form>
          </div>
        </div>
      )
    } else {
      return <h2>Loading</h2>
    }
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(mapState, mapDispatchToProps)(Checkout)
