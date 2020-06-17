import React from 'react'
import { connect } from 'react-redux'
import { getSingleProduct } from '../store/singleProduct'

class SingleProduct extends React.Component  {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getProduct(this.props.match.params.id)
    }

    render() {
         return (
            <div>
                {product.name}
                {product.imgUrl}
                {product.description}
                price: {product.price}
                <input name='amount' type='integer' min='0'></input>
                <button>add to cart</button>
            </div>
         )
    }
}

const mapState = state => ({
    product: state.product
})

const mapDispatch = dispatch => ({
    getProduct: id => dispatch(getSingleProduct(id))
})

export default connect(mapState, mapDispatch)(SingleProduct)