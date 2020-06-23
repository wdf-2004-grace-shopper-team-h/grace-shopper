import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/orders'
import {render} from 'enzyme'

class AllOrders extends React.Compoonent {
  componentDidMount() {
    this.props.getOrders()
  }

  render() {
    const {orders} = this.props
    return (
      <div>
        <h3>Order History</h3>
        <div>
          {orders.map(order => (
            <dl>
              <dt>Order Date</dt>
              <dd>{order.updatedAt}</dd>
              <dt>Order Total</dt>
              <dd>{order.total}</dd>
            </dl>
          ))}{' '}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  orders: state.orders
})

const mapDispatch = dispatch => ({
  getOrders: () => dispatch(fetchOrders())
})

export default connect(mapState, mapDispatch)(AllOrders)
