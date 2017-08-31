import React, {Component} from 'react';
import { connect } from 'react-redux'
import {loadCategoryPosts} from '../actions/categories'
class CategoryPage extends Component {

  componentDidMount() {
    let categoryName = this.props.match.params.name
    this.props.loadCategoryPostsDispatch(categoryName);
  }
  render() {
    let categoryName = this.props.match.params.name
    let {activeCategoryPosts} = this.props
    return (
      <div> {categoryName} Category Page
          {activeCategoryPosts.length > 0 && activeCategoryPosts.map((post) => (
            <div key={post.id}>
              <div>{post.title}</div>
              <div>{post.voteScore}</div>
              <div>{post.category}</div>
            </div>
          )) }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    activeCategoryPosts: state.categories.activeCategoryPosts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCategoryPostsDispatch: (name) => {
      dispatch(loadCategoryPosts(name))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryPage)

