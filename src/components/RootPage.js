import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment'
import sortBy from 'sort-by'
import {Icon} from 'semantic-ui-react'

class RootPage extends Component {
  state = {
    postOrder: 'voteScore'
  }
  onOrderChange = (e) => {
    this.setState({
      postOrder: e.target.value
    })
  }

  render() {
    let { categories, posts } = this.props;

    // posts.sort(sortBy(this.state.postOrder))
    return (
      <div>
        <div className="main-categories-section">
          <h3>Categories</h3>
          <div className="category-list">
            {categories.map((category,index) => (
              <div key={index} className="card">
                <Link to={`/category/${category.name}`} >{category.name}</Link>
              </div>
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
            <Link to={`/create`} ><Icon name='add'/></Link>
          </h3>

          {posts.length > 0 && posts.map((post) => (
            <div key={post.id} className="card">
             <Link to={`/post/${post.id}`}>
                <div>{post.title}</div>
                <div>{post.voteScore}</div>
                <div>{post.category}</div>
              </Link>
              <Moment format="MMM DD YYYY">{post.timestamp}</Moment>
            </div>
          ))}
        </div>
      </div>
    )

  }
}

export default RootPage;