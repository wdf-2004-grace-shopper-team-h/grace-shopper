import React from 'react'

const SingleProduct = props => {
    const {product} = props

    return (
        <div>
            {product.name}
            {product.imgUrl}
            {product.description}
            amount: {product.amount}
            price: {product.price}
        </div>
    )
}