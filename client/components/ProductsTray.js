import React from 'react'

const ProductTray = props => {
  const order = props.products
  let totalAmount = 0
  order.map(product => {
    totalAmount += product.price * product.total_amount
  })
  return (
    <table>
      <tbody>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Price</th>
        </tr>
        {order.map(product => (
          <tr key={product.id}>
            <td>
              <img src={product.imgUrl} width="200" height="200" />
            </td>
            <td>{product.name}</td>
            <td>{product.total_amount}</td>
            <td>{product.price * product.total_amount}</td>
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
  )
}

export default ProductTray
