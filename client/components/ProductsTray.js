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
      <h2>Cart Order # {order.id}</h2>
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
              <td>
                <select
                  id={order.id}
                  defaultValue={item.order_products.numberOfItems}
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
                {item.order_products.numberOfItems}
              </td>
              <td>{item.price * item.order_products.numberOfItems}</td>
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
  //return <div/>
}

export default ProductTray
