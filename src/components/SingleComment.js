import React, { Component } from 'react'
import Moment from 'react-moment'
import MdEdit from 'react-icons/lib/md/edit'
import MdDelete from 'react-icons/lib/md/delete'
import { Card, Button, Modal,Input } from 'semantic-ui-react'


class SingleComment extends Component {

  deleteComment = () => {
    this.props.deleteCommentHandler(this.props.comment.id)
  }
  openEditModal = () => {
    this.props.openEditModal(this.props.comment.id)
  }
  render() {
    let { comment } = this.props
    return (
      <div className="single-comment-wrapper" >
        <Card>
          <Card.Content>
            <Card.Header>{comment.author}</Card.Header>
            <Card.Meta> <Moment format="MMM DD YYYY">{comment.timestamp}</Moment></Card.Meta>
            <Card.Description>{comment.body}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            Vote: {comment.voteScore}
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green' onClick={this.openEditModal}><MdEdit size={30} /></Button>
              <Button basic color='red' onClick={this.deleteComment}><MdDelete size={30} /></Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default SingleComment;