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
            <tr key={item.id} id={item.id}>
              <td>
                <img src={item.imgUrl} width="200" height="200" />
              </td>
              <td>{item.name}</td>
              <td>
                <select
                  defaultValue={item.numberOfItems}
                  onChange={props.handleChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                </select>
              </td>
              <td>{item.price * item.numberOfItems}</td>
              <td>
                <button onClick={props.handleClickDel}>Delete</button>
              </td>
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
