import React, { Component } from 'react'
import PropTypes from 'prop-types'

class OrderDropDown extends Component {
  static propTypes = {
    defaultValue: PropTypes.string.isRequired,
    sortChange: PropTypes.func.isRequired
  }

  state = {
    postOrder: ''
  }

  // Update sort by value and call the parent function
  onOrderChange = (e) => {
    this.setState({
      postOrder: e.target.value
    })
    this.props.sortChange(e.target.value);
  }

  componentDidMount() {
    this.setState({
      postOrder: this.props.defaultValue
    })
  }

  render() {
    return (
      <select value={this.state.postOrder} onChange={(event) => this.onOrderChange(event)}>
        <option value="timestamp">Date</option>
        <option value="voteScore">Score</option>
      </select>
    )
  }
}

export default OrderDropDown