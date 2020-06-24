import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/orders'
import {Link} from 'react-router-dom'
class AllOrders extends React.Component {
  componentDidMount() {
    console.log('component mounted')
    this.props.getOrders()
  }

  render() {
    const {orders} = this.props
    if (orders.length) {
      return (
        <div>
          <h2>Order History</h2>

          <div>
            {orders.map(order => (
              <dl key={order.id}>
                <dt>
                  <Link to={`/orders/${orders.id}`}>
                    <b>Order #</b>
                  </Link>
                </dt>
                <dd>{order.id}</dd>
                <dt>
                  <b>Order Date</b>
                </dt>
                <dd>{order.updatedAt}</dd>
                <dt>
                  <b>Order Total</b>
                </dt>
                <dd>${order.total / 100}</dd>
              </dl>
            ))}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Order History</h2>
          <div> No Past Orders.</div>
        </div>
      )
    }
  }
}

const mapState = state => ({
  orders: state.orders
})

const mapDispatch = dispatch => ({
  getOrders: () => dispatch(fetchOrders())
})

export default connect(mapState, mapDispatch)(AllOrders)
