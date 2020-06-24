import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrder} from '../store/singleOrder'
import ProductsTray from './ProductsTray'
import moment from 'moment'
export class SingleOrder extends React.Component {
  componentDidMount() {
    const id = Number(this.props.match.params.id)
    this.props.getOrder(id)

    // this.handleClick = this.handleClick.bind(this)
  }

  // handleClick () => {

  // }

  render() {
    const {order} = this.props
    const products = order.products
    console.log(products)
    if (order.id) {
      return (
        <div>
          <div>
            <h2>Order # {order.id}</h2>
            <dl>
              <dt style={{marginLeft: 16 + 'px'}}>
                <b>Order Placed:</b>
              </dt>
              <dd style={{marginBottom: 1 + 'em'}}>
                {moment(order.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
              </dd>
              <dt style={{marginLeft: 16 + 'px'}}>
                <b>Total:</b>
              </dt>
              <dd>${order.total / 100}</dd>
            </dl>
          </div>

          <div>
            {products.map(product => (
              <dl key={product.id}>
                <h3 style={{marginLeft: 6 + 'em'}}>
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <dd>
                  {' '}
                  <img src={product.imgUrl} width="200" height="200" />
                </dd>
                <dd>
                  <b>Price Sold:</b> ${product.order_products.priceSold / 100}
                </dd>
                <dd>
                  <b>Quantity:</b> {product.order_products.numberOfItems}{' '}
                </dd>
              </dl>
            ))}
          </div>
        </div>
      )
    } else {
      return <div />
    }
  }
}

const mapState = state => ({
  order: state.singleOrder
})

const mapDispatch = dispatch => ({
  getOrder: id => dispatch(fetchOrder(id))
})

export default connect(mapState, mapDispatch)(SingleOrder)
