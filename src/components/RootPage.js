import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment'
import sortBy from 'sort-by'
import { Icon, Card, Divider, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { loadPosts, voteScore } from '../actions/posts'
import { loadCategories } from '../actions/categories'
import SinglePost from './SinglePost'

class RootPage extends Component {
  state = {
    postOrder: 'voteScore'
  }

  componentDidMount() {
    this.props.loadCategoriesDispatch()
    this.props.loadPostsDispatch()
  }

  onOrderChange = (e) => {
    this.setState({
      postOrder: e.target.value
    })
  }

  render() {
    let { categories, posts } = this.props;

    posts.sort(sortBy(this.state.postOrder))
    return (
      <div>
        <Grid container>
          <Grid.Row>
            <Grid.Column>
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
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <div className="main-posts-section">
                <h1>Posts</h1>
                <span>
                  <select value={this.state.postOrder} onChange={(event) => this.onOrderChange(event)}>
                    <option value="timestamp">Date</option>
                    <option value="voteScore">Score</option>
                  </select>
                </span>
                <Link to={`/create`} ><Icon name='add' /></Link>

                <Card.Group>
                  {posts.length > 0 && posts.map((post, index) => (
                    <SinglePost key={post.id} post={post} changeVoteScoreDispatch={this.props.changeVoteScoreDispatch} />
                  ))}
                </Card.Group>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts.posts,
    categories: state.categories.categoriesList
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
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(RootPage);
