import React, { Component } from 'react'
import Moment from 'react-moment'
import MdEdit from 'react-icons/lib/md/edit'
import MdDelete from 'react-icons/lib/md/delete'
import { Card, Button } from 'semantic-ui-react'
import VoteScore from './VoteScore'

class SingleComment extends Component {
  handleVoteScore = (id, vote) => {
    this.props.triggerCommentVoteScore(this.props.comment, vote)
  }
  render() {
    let { comment } = this.props
    return (
      <div className="single-comment-wrapper" >
        <Card key={comment.id}>
          <Card.Content>
            <Card.Header>{comment.author}</Card.Header>
            <Card.Meta> <Moment format="MMM DD YYYY">{comment.timestamp}</Moment></Card.Meta>
            <Card.Description>{comment.body}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <VoteScore handleVoteScore={this.handleVoteScore} commentId={comment.id} score={comment.voteScore}></VoteScore>
          </Card.Content>
          <Card.Content extra>
            <div>{comment.id}</div>
            <div>{comment.parentId}</div>
            <div className='ui two buttons'>
              <Button basic color='green' onClick={() => this.props.openEditModal(comment.id)}><MdEdit size={30} /></Button>
              <Button basic color='red' onClick={() => this.props.deleteCommentHandler(comment.id)}><MdDelete size={30} /></Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default SingleComment