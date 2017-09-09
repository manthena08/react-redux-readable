import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CategoryDropDown extends Component {
  static propTypes = {
    firstValue: PropTypes.string,
    changeCategory: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
  }

  state = {
    category: ''
  }

  // Update sort by value and call the parent function
  onCategoryChange = (e) => {
    this.setState({
      category: e.target.value
    })
    this.props.changeCategory(e.target.value);
  }

  componentDidMount() {
    debugger;
    this.setState({
      category: this.props.firstValue
    })
  }

  render() {
    return (
      <div className="bk-inline-form">
        <label htmlFor="category-selection-dropdown">Category</label>
        <select id="category-selection-dropdown" value={this.state.category} onChange={(event) => this.onCategoryChange(event)}>
          {this.props.categories.length > 0 && this.props.categories.map(category => (
            <option key={category.name} value={category.path}>{category.name}</option>
          ))}
        </select>
      </div>
    )
  }
}

export default CategoryDropDown