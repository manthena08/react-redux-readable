import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import RootPage from './home/RootPage';
import CategoryPage from './category/CategoryPage';
import PostPage from './posts/PostPage';
import CreatePostPage from './posts/CreatePostPage'
import NotFound from './common/NotFound'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Readable</h2>
        </div>
        <div className="App-main">
          <Switch>
            <Route exact path="/" component={RootPage} />
            <Route exact path="/category/:name" component={CategoryPage} />
            <Route exact path="/post/:postId" component={PostPage} />
            <Route exact path="/create" component={CreatePostPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
