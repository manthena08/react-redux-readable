import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment'
import sortBy from 'sort-by'
import { Icon, Card, Divider, Grid, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { loadPosts, voteScore, loadAllCommentsByPostId } from '../../actions/posts'
import { loadCategories } from '../../actions/categories'
import SinglePost from '../posts/SinglePost'
import OrderDropDown from '../common/OrderDropDown'
class RootPage extends Component {
  state = {
    postOrder: 'voteScore'
  }

  componentDidMount() {
    this.props.loadCategoriesDispatch()
    this.props.loadPostsDispatch()
  }

  sortHandlerChange = (orderBy) => {
    this.setState({
      postOrder: orderBy
    })
  }

  render() {
    let { categories, posts } = this.props;

    posts.sort(sortBy(this.state.postOrder))
    return (
      <div>
        <Container>
          <div className="main-categories-section">
            <h1>Categories</h1>
            <div className="category-list">
              <Card.Group>
                {categories.map((category, index) => (
                  <Card key={index}>
                    <Card.Content>
                      <Card.Header color='green'>
                        <Link to={`/category/${category.name}`} >
                          <span className="category-card-name">
                            {(category.name).toUpperCase()}
                          </span>
                        </Link>
                      </Card.Header>
                    </Card.Content>
                  </Card>
                ))}
              </Card.Group>
            </div>
          </div>
          <Divider />
          <div className="main-posts-section">
            <h1>Posts</h1>
            <OrderDropDown defaultValue={this.state.postOrder} sortChange={this.sortHandlerChange} />
            <Link to={`/create`} ><Icon name='add' /></Link>

            <Card.Group>
              {posts.length > 0 && posts.map((post, index) => (
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
