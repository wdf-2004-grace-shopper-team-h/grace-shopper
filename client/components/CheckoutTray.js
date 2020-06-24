import React from 'react'

const CheckoutTray = props => {
  const products = props.cart.products

  let totalAmount = 0
  products.map(item => {
    totalAmount += item.price * item.order_products.numberOfItems
  })

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          {products.map(item => (
            <tr key={item.id} id={item.id}>
              <td>
                <img src={item.imgUrl} width="200" height="200" />
              </td>
              <td>{item.name}</td>
              <td>{item.order_products.numberOfItems}</td>
              <td>{item.price * item.order_products.numberOfItems / 100}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3" align="right">
              <b>Subtotal:</b>
            </td>
            <td>{totalAmount / 100}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CheckoutTray
