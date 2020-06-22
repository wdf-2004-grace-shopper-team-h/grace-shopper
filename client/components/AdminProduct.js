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
    this.handleOnClickSubmit = this.handleOnClickSubmit.bind(this)
    this.handleOnClickRemove = this.handleOnClickRemove.bind(this)
  }

  async componentDidMount() {
    const id = this.props.match.params.id
    await this.props.getProduct(id)
    this.setState({
      name: this.props.product.name,
      inventoryAmount: this.props.product.inventoryAmount,
      price: this.props.product.price,
      imgUrl: this.props.product.imgUrl,
      description: this.props.product.description
    })
  }

  handleOnClickSubmit(event) {
    event.preventDefault()
    const id = this.props.match.params.id
    try {
      this.props.modifyProduct(id, this.state)
    } catch (err) {
      console.log('Modify product reject', err)
    }
  }

  //delete
  handleOnClickRemove = async event => {
    event.preventDefault()
    const id = this.props.match.params.id
    try {
      await this.props.deleteProduct(id)
      this.props.history.push('/products')
    } catch (err) {
      console.log('Auchtung!!', err)
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    if (!this.state.name) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
          <center>
            <h3>Modify Product</h3>
          </center>
          <ModifyProductForm
            stuff={this.state}
            onChangeFunc={this.handleChange}
            onClickFunc={this.handleOnClickSubmit}
          />
          <center>
            <button onClick={this.handleOnClickRemove}>
              Delete This Product.
            </button>
          </center>
        </div>
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
    deleteProduct: id => deleteProduct(id),
    modifyProduct: (id, obj) => dispatch(modifyProduct(id, obj)),
    getProduct: id => dispatch(fetchProduct(id))
  }
}

export default connect(mapState, mapDispatch)(AdminProduct)
