import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CategoryDropDown extends Component {
  static propTypes = {
    selectCategeory: PropTypes.string,
    changeCategory: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
  }

  // Update sort by value and call the parent function
  onCategoryChange = (e) => {
    
    this.props.changeCategory(e.target.value);
  }

  componentDidMount() {
    if(!this.props.selectCategeory){
      this.props.changeCategory(this.props.categories[0].name);
    }
  }

  render() {
    let selectedCategory = this.props.selectCategeory
    return (
      <div className="bk-inline-form">
        <label htmlFor="category-selection-dropdown">Category</label>
        <select id="category-selection-dropdown" value={selectedCategory} onChange={(event) => this.onCategoryChange(event)}>
          {this.props.categories.length > 0 && this.props.categories.map(category => (
            <option key={category.name} value={category.path}>{category.name}</option>
          ))}
        </select>
      </div>
    )
  }
}

export default CategoryDropDown