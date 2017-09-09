import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Icon } from 'semantic-ui-react'
import { loadCategoryPosts } from '../../actions/categories'
import SinglePost from '../posts/SinglePost'
import { voteScore, loadAllCommentsByPostId } from '../../actions/posts'

class CategoryPage extends Component {

  static propTypes = {
    changeVoteScoreDispatch: PropTypes.func.isRequired,
    loadCategoryPostsDispatch: PropTypes.func.isRequired,
    loadCurrentCommentsDispatch: PropTypes.func.isRequired,
    activeCategoryPosts: PropTypes.array,
    comments: PropTypes.object
  }

  componentDidMount() {
    this.props.loadCategoryPostsDispatch(this.props.match.params.name);
  }

  render() {
    let categoryName = this.props.match.params.name
    let { activeCategoryPosts } = this.props
    return (
      <div>
        <Container>
          <h1>
            <Icon name="arrow left" onClick={() => this.props.history.goBack()} />
            {categoryName.toUpperCase()} Category Page
          </h1>
          {activeCategoryPosts.length > 0 && activeCategoryPosts.map((post) => (
            <SinglePost key={post.id} post={post} comments={this.props.comments[post.id]}
              changeVoteScoreDispatch={this.props.changeVoteScoreDispatch}
              loadCurrentComments={this.props.loadCurrentCommentsDispatch} />
          ))}
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    activeCategoryPosts: state.categories.activeCategoryPosts,
    comments: state.posts.comments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCategoryPostsDispatch: (name) => {
      dispatch(loadCategoryPosts(name))
    },
    changeVoteScoreDispatch: (post, status) => {
      dispatch(voteScore(post, status))
    },
    loadCurrentCommentsDispatch: (postId) => {
      dispatch(loadAllCommentsByPostId(postId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)

