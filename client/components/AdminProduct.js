import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchProduct,
  deleteProduct,
  modifyProduct
} from '../store/singleProduct'
import ModifyProductForm from './ModifyProductForm'

export class AdminProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      inventoryAmount: 0,
      price: 0,
      imgUrl: '',
      description: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
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

  handleChange(event) {
    console.log(event.target.name)
    // this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const product = this.props.product

    if (!product.id) {
      return <h1>Loading...</h1>
    } else {
      return (
        <ModifyProductForm
          stuff={product}
          forChange={this.state}
          onChangeFunc={this.handleChange}
          onClickFunc={this.handleOnClick}
        />
      )
    }
  }
}

const mapState = state => {
  return {
    product: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    deleteProduct: id => dispatch(deleteProduct(id)),
    modifyProduct: (id, obj) => dispatch(modifyProduct(id, obj))
  }
}

export default connect(mapState, mapDispatch)(AdminProduct)
