import React from 'react'
import { fetchPastOrders } from '../store/pastOrders'
import { connect } from 'react-redux'

class PastOrders extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchOrders(this.props.user.id)
    }

    render() {
        return (
            <ul>
                {this.props.orders.map(order => (
                    <li key={order.id}>
                    {`${order.quantity} ${order.name} ${order.quantity > 1 ? 's' : ''}`}
                    <img src={order.imgUrl} />
                    total: {order.total}
                    </li>
                ))}
            </ul>
        )
    }
}

const mapState = state => ({
    orders: state.orders
})

const mapDispatch = dispatch => ({
    fetchOrders: id => dispatch(fetchPastOrders(id))
})

export default connect(mapState, mapDispatch)(PastOrders)