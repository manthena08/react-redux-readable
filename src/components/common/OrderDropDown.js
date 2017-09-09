import React, { Component } from 'react'
import PropTypes from 'prop-types'

class OrderDropDown extends Component {
  static propTypes = {
    defaultValue: PropTypes.string.isRequired,
    sortChange: PropTypes.func.isRequired
  }

  state = {
    order: ''
  }

  // Update sort by value and call the parent function
  onOrderChange = (e) => {
    this.setState({
      order: e.target.value
    })
    this.props.sortChange(e.target.value);
  }

  componentDidMount() {
    this.setState({
      order: this.props.defaultValue
    })
  }

  render() {
    return (
      <div>
        <label htmlFor ="sort-by" >Sort By :</label>
        <select id="sort-by" value={this.state.order} onChange={(event) => this.onOrderChange(event)}>
          <option value="-timestamp">Date</option>
          <option value="-voteScore">Score</option>
        </select>
      </div>
    )
  }
}

export default OrderDropDown