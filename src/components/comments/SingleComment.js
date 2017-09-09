import React, { Component } from 'react'
import Moment from 'react-moment'
import { Card, Button, Icon } from 'semantic-ui-react'
import VoteScore from '../common/VoteScore'

class SingleComment extends Component {
  handleVoteScore = (id, vote) => {
    this.props.triggerCommentVoteScore(this.props.comment, vote)
  }

  render() {
    let { comment } = this.props
    return (
        <Card className="single-comment-wrapper" key={comment.id} fluid>
          <Card.Content>
            <Card.Header>{comment.author}</Card.Header>
            <Card.Meta> <Moment format="MMM DD YYYY">{comment.timestamp}</Moment></Card.Meta>
            <Card.Description>{comment.body}</Card.Description>
          </Card.Content>
          <Card.Content extra >
            <VoteScore handleVoteScore={this.handleVoteScore} controlId={comment.id} score={comment.voteScore}></VoteScore> 
            <div className='ui buttons'>
              
              <Button basic color='green' onClick={() => this.props.openEditModal(comment.id)}><Icon name="edit" /></Button>
              <Button basic color='red' onClick={() => this.props.deleteCommentHandler(comment.id)}><Icon name="delete" /></Button>
            </div>
          </Card.Content>
        </Card>
    )
  }
}

export default SingleComment