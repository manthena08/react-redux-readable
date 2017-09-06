import React, { Component } from 'react'

class OrderDropDown extends Component {
  state = {
    postOrder: ''
  }
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