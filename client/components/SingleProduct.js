import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchProduct,
  deleteProduct,
  modifyProduct
} from '../store/singleProduct'
import {me} from '../store/user'
export class SingleProduct extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getProduct(id)
    this.props.getUser()
  }

  handleOnClick = params => event => {}

  //delete
  handleOnClickRemove = id => event => {
    event.preventDefault()
    try {
      this.props.deleteProduct(id)
    } catch (err) {
      console.log('Auchtung!!', err)
    }
  }

  handlrOnClickAddToCart = () => event => {}

  render() {
    if (this.props.user.admin) {
      this.props.history.push(`/admin_product/${this.props.match.params.id}`)
    }
    const product = this.props.product
    // return <h1>Loading...</h1>
    return (
      <div className="singleProduct" key={product.id}>
        <h4>{product.name}</h4>
        <img src={product.imgUrl} width="300" height="300" />
        <p>{product.description}</p>
        <p>price: {product.price / 100}</p>
        {product.inventoryAmount > 0 ? 'In Stock \n' : 'Out of Stock'}
        {product.inventoryAmount > 0 ? (
          <button onClick={this.handlrOnClickAddToCart()}>Add to cart</button>
        ) : (
          <p />
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleProduct,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    deleteProduct: id => dispatch(deleteProduct(id)),
    modifyProduct: (id, obj) => dispatch(modifyProduct(id, obj)),
    getProduct: id => dispatch(fetchProduct(id)),
    getUser: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
