import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  handlrOnClickAddToCart = () => event => {}

  render() {
    const {products} = this.props
    return (
      <center>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>
                <h4>{product.name}</h4>
              </Link>
              <div>
                <img src={product.imgUrl} width="200" height="200" />price: ${product.price /
                  100}
              </div>
              <button onClick={this.handlrOnClickAddToCart()}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </center>
    )
  }
}

const mapState = state => ({
  products: state.products
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(AllProducts)
