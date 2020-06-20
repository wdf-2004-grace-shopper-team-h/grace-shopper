import React from 'react'

const ProductTray = props => {
  const order = props
  const products = props.products
  let totalAmount = 0
  products.map(product => {
    totalAmount += product.price * product.quantitySold
  })
  return (
    <div>
      <h2>Order # {order.id}</h2>
      <table>
        <tbody>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          {products.map(product => (
            <tr key={product.id}>
              <td>
                <img src={product.imgUrl} width="200" height="200" />
              </td>
              <td>{product.name}</td>
              <td>{product.quantitySold}</td>
              <td>{product.price * product.quantitySold}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3" align="right">
              <b>Subtotal:</b>
            </td>
            <td>{totalAmount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ProductTray
