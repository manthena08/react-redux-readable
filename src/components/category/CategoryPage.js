import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { loadCategoryPosts } from '../../actions/categories'
import SinglePost from '../posts/SinglePost'
import { voteScore } from '../../actions/posts'

class CategoryPage extends Component {

  componentDidMount() {
    let categoryName = this.props.match.params.name
    this.props.loadCategoryPostsDispatch(categoryName);
  }
  render() {
    let categoryName = this.props.match.params.name
    let { activeCategoryPosts } = this.props
    return (
      <div>
        <Container>
          <h1>{categoryName.toUpperCase()} Category Page</h1>
          {activeCategoryPosts.length > 0 && activeCategoryPosts.map((post) => (
            <SinglePost key={post.id} post={post} changeVoteScoreDispatch={this.props.changeVoteScoreDispatch} />
          ))}
        </Container>
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
    },
    changeVoteScoreDispatch: (post, status) => {
      dispatch(voteScore(post, status))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)

