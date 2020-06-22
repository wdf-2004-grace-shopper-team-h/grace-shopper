import React from 'react'

const ProductTray = props => {
  const order = props.order
  const products = props.order.products

  let totalAmount = 0
  products.map(item => {
    totalAmount += item.price * item.order_products.numberOfItems
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
          {products.map(item => (
            <tr key={item.id}>
              <td>
                <img src={item.imgUrl} width="200" height="200" />
              </td>
              <td>{item.name}</td>
              <td>{item.order_products.numberOfItems}</td>
              <td>{item.price * item.order_products.numberOfItems}</td>
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
