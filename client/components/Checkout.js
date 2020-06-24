import React from 'react'
import {connect} from 'react-redux'
import ProductTray from './ProductsTray'

export class Checkout extends React.Component {
  handleOnClick = () => async event => {
    //take ddata from cart redux store and send it to oder model.
  }

  render() {
    console.log(this.props)
    const order = this.props.order.products
    const user = this.props.user
    return (
      <div className="submitContainer">
        <div className="productTray">
          <ProductTray products={order} />
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={user.email ? user.email : 'Enter your email'}
                required
              />
            </div>
            <div>
              <label htmlFor="Address">Address</label>
              <input
                type="Address"
                id="address"
                name="address"
                placeholder={user.address ? user.address : 'Enter your Address'}
                required
              />
            </div>
            <button type="submit">Confirm Order</button>
            {/*if not filled, button should not work , handleSubmit to 
            change order.isCompleted to true and redirect to orders page. 
            take price total and append to price sold , orders total*/}
          </form>
        </div>
      </div>
    )
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
