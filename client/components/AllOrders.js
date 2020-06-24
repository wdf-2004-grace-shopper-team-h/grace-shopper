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
                <h3>
                  <Link to={`/orders/${order.id}`}>
                    <b>Order #{order.id}</b>{' '}
                  </Link>
                </h3>

                <dt style={{marginLeft: 16 + 'px'}}>
                  <b>Order Date</b>
                </dt>
                <dd>{order.updatedAt}</dd>
                <dt style={{marginLeft: 16 + 'px'}}>
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
