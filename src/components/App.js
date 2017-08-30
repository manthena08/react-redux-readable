import React, { Component } from 'react';
import { Route,withRouter } from 'react-router-dom'
import logo from '../logo.svg';

import RootPage from './RootPage';
import CategoryPage from './CategoryPage';
import PostPage from './PostPage';
import CreatePostPage from './CreatePostPage'

import { connect } from 'react-redux'
import { loadPosts } from '../actions/posts'
import { loadCategories } from '../actions/categories'

class App extends Component {

  componentDidMount() {
    this.props.loadCategoriesDispatch()
    this.props.loadPostsDispatch()
  }


  render() {
    let { categories,posts } = this.props
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Readable</h2>
        </div>
        <div className="App-main">
          <Route exact path="/" render={() => (
            <RootPage categories={categories} posts={posts}></RootPage>
          )} />
          <Route path="/category/:name" component={CategoryPage} />
          <Route path="/post/:postId" component={PostPage} />
          <Route path="/create" component={CreatePostPage} />
        </div>
      </div>
    );
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
    loadCategoriesDispatch : () => {
      dispatch(loadCategories())
    }
  }
}

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(App));
