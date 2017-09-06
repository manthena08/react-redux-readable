import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Moment from 'react-moment'
import { Icon, Card } from 'semantic-ui-react'
import VoteScore from '../common/VoteScore'

class SinglePost extends Component {
  handleVoteScore = (id, vote) => {
    this.props.changeVoteScoreDispatch(this.props.post, vote)
  }
  componentDidMount() {
    this.props.loadCurrentComments(this.props.post.id)
  }
  render() {
    let { post,comments } = this.props
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header><Link to={`/post/${post.id}`}>{post.title}</Link></Card.Header>
          <Card.Meta>Category: {post.category} </Card.Meta>
          <Card.Meta>Published on: <Moment format="MMM DD YYYY">{post.timestamp}</Moment></Card.Meta>
          <Card.Description>
            {post.body}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Meta>
            <VoteScore handleVoteScore={this.handleVoteScore} postId={post.id} score={post.voteScore}></VoteScore>
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