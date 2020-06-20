import React from 'react'

const ProductTray = props => {
  const order = props.order
  const products = props.products

  let totalAmount = 0
  order.map(item => {
    totalAmount += item.product.price * item.numberOfItems
  })

  return (
    <div>
      <h2>Order # {order[0].orderId}</h2>
      <table>
        <tbody>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          {order.map(item => (
            <tr key={item.productId}>
              <td>
                <img src={item.product.imgUrl} width="200" height="200" />
              </td>
              <td>{item.product.name}</td>
              <td>{item.numberOfItems}</td>
              <td>{item.product.price * item.numberOfItems}</td>
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
  //return <div/>
}

export default ProductTray
