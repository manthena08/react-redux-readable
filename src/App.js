import React, { Component } from 'react';
import Moment from 'react-moment'
import sortBy from 'sort-by'
import logo from './logo.svg';
import './App.css';
import * as ReadableAPI from './ReadableAPI'

class App extends Component {
  state = {
    categories: [],
    posts: [],
    postOrder: 'voteScore'
  }

  componentDidMount() {
    this.getCategories()
    this.getPosts()
  }

  getCategories = () => {
    ReadableAPI.getCategories()
      .then((categories) => {
        this.setState({
          categories
        })
      })
  }

  getPosts = () => {
    ReadableAPI.getPosts()
      .then((posts) => {
        this.setState({
          posts
        })
      })
  }

  onOrderChange = (e) => {
    this.setState({
      postOrder: e.target.value
    })
  }

  render() {
    let {categories,posts} = this.state
    posts.sort(sortBy(this.state.postOrder))
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Readable</h2>
        </div>
        <div className="App-main">
          <div className="main-categories-section">
            <h3>Categories</h3>
            <div className="category-list">
            {categories.map((category) => (
              <div key={category.index} className="card">{category.name}</div>
            ))}
            </div>
          </div>
          <div className="main-posts-section">
            <h3>Posts 
              <span>
              <select value={this.state.postOrder} onChange={(event) => this.onOrderChange(event)}>
                  <option value="timestamp">Date</option>
                  <option value="voteScore">Score</option>
                </select>
              </span>
            </h3>

            {posts.length > 0  && posts.map((post) => (
              <div key={post.index}>
                <div>{post.title}</div>
                <div>{post.voteScore}</div>
                <Moment format="MMM DD YYYY">{post.timestamp}</Moment>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
