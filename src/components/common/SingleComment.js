import React, { Component } from 'react'
import Moment from 'react-moment'
import MdEdit from 'react-icons/lib/md/edit'
import MdDelete from 'react-icons/lib/md/delete'
import { connect } from 'react-redux'
import { Card, Button, Icon } from 'semantic-ui-react'
import VoteScore from './VoteScore'
// import { commentVoteScore } from '../../actions/posts'

class SingleComment extends Component {

  // deleteComment = () => {
  //   this.props.deleteCommentHandler(this.props.comment.id)
  // }
  // openEditModal = () => {
  //   this.props.openEditModal(this.props.comment.id)
  // }
  // handleCommentVoteScore = (id, vote) => {
  //   this.props.changeCommentScoreDispatch(this.props.comment, vote)
  // }

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
            <VoteScore handleVoteScore={this.triggerCommentVoteScore} commentId={comment.id} score={comment.voteScore}></VoteScore>
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

// const mapStateToProps = (state, ownProps) => {
//   return {
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     changeCommentScoreDispatch: (comment, status) => {
//       dispatch(commentVoteScore(comment, status))
//     }
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(SingleComment);

export default SingleComment