import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Moment from 'react-moment'
import { Card } from 'semantic-ui-react'
import VoteScore from '../common/VoteScore'
import PropTypes from 'prop-types'

class SinglePost extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired,
    comments: PropTypes.array,
    changeVoteScoreDispatch: PropTypes.func.isRequired,
    loadCurrentComments: PropTypes.func.isRequired
  }
  // dispatch when user changes votes score
  handleVoteScore = (id, vote) => {
    this.props.changeVoteScoreDispatch(this.props.post, vote)
  }
  // load comments for this post
  componentDidMount() {
    this.props.loadCurrentComments(this.props.post.id)
  }
  render() {
    let { post, comments } = this.props
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header><Link to={`/post/${post.id}`}>{post.title}</Link></Card.Header>
          <Card.Meta>Category: {post.category} </Card.Meta>
          <Card.Meta>Published on: <Moment format="MMM DD YYYY">{post.timestamp}</Moment></Card.Meta>
          <Card.Description>{post.body}</Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Meta>
            <VoteScore handleVoteScore={this.handleVoteScore} controlId={post.id} score={post.voteScore}></VoteScore>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          {comments ? comments.length : 0} comments
        </Card.Content>
      </Card>
    )
  }
}

export default SinglePost