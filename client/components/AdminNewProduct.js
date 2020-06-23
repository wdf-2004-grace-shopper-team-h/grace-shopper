import React from 'react'
import Axios from 'axios'
import ProductForm from './ProductForm'
import {connect} from 'react-redux'
import {addProduct} from '../store/singleProduct'

export class AdminNewProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      inventoryAmount: 0,
      price: 0,
      imgUrl: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleOnClickSubmit = this.handleOnClickSubmit.bind(this)
  }

  async handleOnClickSubmit(event) {
    event.preventDefault()
    try {
      await this.props
        .createProduct(this.state)
        .then(id => this.props.history.push(`/admin_product/${id}`))
    } catch (err) {
      console.log('Add new product reject', err)
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div>
        <center>
          <h3>Add New Product</h3>
        </center>
        <ProductForm
          stuff={this.state}
          onChangeFunc={this.handleChange}
          onClickFunc={this.handleOnClickSubmit}
        />
      </div>
    )
  }
}

const mapDispatch = () => {
  return {
    createProduct: obj => addProduct(obj)
  }
}

export default connect(null, mapDispatch)(AdminNewProduct)
