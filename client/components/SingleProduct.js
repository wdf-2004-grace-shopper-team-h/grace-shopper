import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import {Link} from 'react-router-dom'
import {pushProduct} from '../store/cart'
import {me} from '../store/user'
import {setNumItems} from '../store/numberOfItems'

export class SingleProduct extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getProduct(id)
    this.props.getUser()
    this.addToCartTest = this.addToCartTest.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handlrOnClickAddToCart = () => event => {}

  handleClick(event) {
    event.preventDefault()
  }

  async addToCartTest(event) {
    event.preventDefault()
    await this.props.pushProduct(this.props.product.id)
  }

  handleChange(event) {
    this.props.setNumItems(Number(event.target.value))
  }

  render() {
    //if user is admin -> redirect to admin page of product
    if (this.props.user.admin) {
      this.props.history.push(`/admin_product/${this.props.match.params.id}`)
    }
    const product = this.props.product
    return (
      <div className="singleProduct" key={product.id}>
        <h4>{product.name}</h4>
        <img src={product.imgUrl} width="300" height="300" />
        <p>{product.description}</p>
        <p>price: {product.price / 100}</p>
        <select defaultValue={1} onChange={this.handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        {product.inventoryAmount > 0 ? 'In Stock \n' : 'Out of Stock'}
        {product.inventoryAmount > 0 ? (
          <button onClick={this.addToCartTest}>Add to cart</button>
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
    getProduct: id => dispatch(fetchProduct(id)),
    getUser: () => dispatch(me()),
    pushProduct: productId => dispatch(pushProduct(productId)),
    setNumItems: num => dispatch(setNumItems(num))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
