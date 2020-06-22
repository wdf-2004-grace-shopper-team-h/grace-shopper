import React from 'react'

const ModifyProductForm = props => {
  return (
    <center>
      <form id="form" onSubmit={props.handleOnClick}>
        <label htmlFor="name">Name:</label>

        <input
          type="text"
          name="name"
          onChange={props.handleChange}
          value={props.name}
        />

        <label htmlFor="imgUrl">imgUrl:</label>

        <input
          type="text"
          name="imgUrl"
          onChange={props.handleChange}
          value={props.imgUrl}
        />

        <label htmlFor="description">Description:</label>

        <input
          type="number"
          name="description"
          onChange={props.handleChange}
          value={props.description}
        />

        <button type="submit">Submit</button>
      </form>
    </center>
  )
}

export default ModifyProductForm
