import React from 'react'
import Axios from 'axios'
import ModifyProductForm from './ModifyProductForm'

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
      const {data} = await Axios.post(
        '/api/products/create_new_product',
        this.state
      )
      this.props.history.push(`/admin_product/${data.id}`)
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
        <ModifyProductForm
          stuff={this.state}
          onChangeFunc={this.handleChange}
          onClickFunc={this.handleOnClickSubmit}
        />
      </div>
    )
  }
}

export default AdminNewProduct
