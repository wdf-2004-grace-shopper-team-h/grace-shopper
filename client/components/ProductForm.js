import React from 'react'

/*
Used for create new product and modify product under admin user
*/

const ProductForm = props => {
  const product = props.stuff
  return (
    <center>
      <form id="admin_form" onSubmit={props.onClickFunc} width="500px">
        <label htmlFor="name">Name:</label>

        <input
          type="text"
          name="name"
          onChange={props.onChangeFunc}
          value={product.name}
        />

        <label htmlFor="imgUrl">imgUrl:</label>

        <input
          type="text"
          name="imgUrl"
          onChange={props.onChangeFunc}
          value={product.imgUrl}
        />

        <label htmlFor="description">Description:</label>

        <input
          type="text"
          name="description"
          onChange={props.onChangeFunc}
          value={product.description}
        />

        <label htmlFor="price">Price:</label>

        <input
          type="number"
          name="price"
          onChange={props.onChangeFunc}
          value={product.price}
        />

        <label htmlFor="inventoryAmount">Inventory amount:</label>

        <input
          type="number"
          name="inventoryAmount"
          onChange={props.onChangeFunc}
          value={product.inventoryAmount}
        />

        <button type="submit">Submit</button>
      </form>
    </center>
  )
}

export default ProductForm
