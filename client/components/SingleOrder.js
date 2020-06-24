import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrder} from '../store/singleOrder'
export class SingleOrder extends React.Component {
  async componentDidMount() {
    const id = this.props.match.params.id
    await this.props.getOrder(id)

    console.log(this.props)
    // this.handleClick = this.handleClick.bind(this)
  }

  // handleClick () => {

  // }

  render() {
    return <h3>{this.props.id}</h3>
  }
}

const mapState = state => ({
  order: state.order
})

const mapDispatch = dispatch => ({
  getOrder: id => dispatch(fetchOrder(id))
})

export default connect(mapState, mapDispatch)(SingleOrder)
