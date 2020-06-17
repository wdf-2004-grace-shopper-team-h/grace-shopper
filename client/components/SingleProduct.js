import React from 'react'

const SingleProduct = props => {
    const {product} = props

    return (
        <div>
            {product.name}
            {product.imgUrl}
            {product.description}
            price: {product.price}
            <input type='integer' min='0'></input>
            <button>add to cart</button>
        </div>
    )
}