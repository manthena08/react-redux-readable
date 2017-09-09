import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import sortBy from 'sort-by'
import { Icon, Card, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loadPosts, voteScore, loadAllCommentsByPostId } from '../../actions/posts'
import { loadCategories } from '../../actions/categories'
import SinglePost from '../posts/SinglePost'
import CategoryCard from '../category/CategoryCard'
import OrderDropDown from '../common/OrderDropDown'

class RootPage extends Component {
  // prop types
  static propTypes = {
    post: PropTypes.array,
    categories: PropTypes.array,
    comments: PropTypes.object,
    loadPostsDispatch: PropTypes.func.isRequired,
    loadCategoriesDispatch: PropTypes.func.isRequired,
    changeVoteScoreDispatch: PropTypes.func.isRequired,
    loadCurrentCommentsDispatch: PropTypes.func.isRequired,
  }

  state = {
    postOrder: '-voteScore'
  }

  // ajax calls for loading all categories and posts
  componentDidMount() {
    this.props.loadCategoriesDispatch();
    this.props.loadPostsDispatch();
  }

  // Sort by user action
  sortHandlerChange = (orderBy) => {
    this.setState({
      postOrder: orderBy
    })
  }

  render() {
    let { categories, posts } = this.props;
    posts.sort(sortBy(this.state.postOrder));

    return (
      <div>
        <Container>
          <div className="main-categories-section">
            <h1>Categories</h1>
            <div className="category-list">
              <Card.Group itemsPerRow={3}>
                {categories.map((category, index) => (
                  <CategoryCard key={index} category={category} />
                ))}
              </Card.Group>
            </div>
          </div>
          <div className="main-posts-section">
            <div className="home-page-post-header">
              <h1>Posts</h1>
              <OrderDropDown defaultValue={this.state.postOrder} sortChange={this.sortHandlerChange} />
            </div>
            <div className="add-wrapper">
              <Link to={`/create`} ><Icon name='add' />ADD NEW POST</Link>
            </div>
            <Card.Group>
              {posts.length > 0 && posts.map((post) => (
                <SinglePost key={post.id} post={post} comments={this.props.comments[post.id]}
                  changeVoteScoreDispatch={this.props.changeVoteScoreDispatch}
                  loadCurrentComments={this.props.loadCurrentCommentsDispatch} />
              ))}
            </Card.Group>
          </div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts.posts,
    categories: state.categories.categoriesList,
    comments: state.posts.comments
  }
}


const mapDispatchToProps = dispatch => {
  return {
    loadPostsDispatch: () => {
      dispatch(loadPosts())
    },
    loadCategoriesDispatch: () => {
      dispatch(loadCategories())
    },
    changeVoteScoreDispatch: (post, option) => {
      dispatch(voteScore(post, option))
    },
    loadCurrentCommentsDispatch: (postId) => {
      dispatch(loadAllCommentsByPostId(postId))
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(RootPage);
