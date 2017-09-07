import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import RootPage from './home/RootPage';
import CategoryPage from './category/CategoryPage';
import PostPage from './posts/PostPage';
import CreatePostPage from './posts/CreatePostPage'


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Readable</h2>
        </div>
        <div className="App-main">
          <Route exact path="/" component={RootPage} />
          <Route path="/category/:name" component={CategoryPage} />
          <Route path="/post/:postId" component={PostPage} />
          <Route path="/create" component={CreatePostPage} />
        </div>
      </div>
    );
  }
}

export default App;
