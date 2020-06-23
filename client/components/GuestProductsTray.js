import React from 'react'

const GuestProductTray = props => {
  const order = props.order
  let totalAmount = 0
  order.map(item => {
    totalAmount += item.price * item.numberOfItems
  })

  return (
    <div>
      <h2>Guest Cart</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          {order.map(item => (
            <tr key={item.id}>
              <td>
                <img src={item.imgUrl} width="200" height="200" />
              </td>
              <td>{item.name}</td>
              <td>{item.numberOfItems}</td>
              <td>{item.price * item.numberOfItems}</td>
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

export default GuestProductTray
