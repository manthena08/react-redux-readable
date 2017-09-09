import React, { Component } from 'react'
import sortBy from 'sort-by'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import * as uuid from 'react-native-uuid'
import SingleComment from './SingleComment'
import OrderDropDown from '../common/OrderDropDown'
import { loadAllCommentsByPostId, addComment, deleteComment, editComment, commentVoteScore } from '../../actions/posts'
import { Button, Modal, TextArea, Form, Icon, Card } from 'semantic-ui-react'

class CommentBox extends Component {
  state = {
    showNewComment: false,
    commentOrder: '-voteScore',
    commentEditModelOpen: false,
    activeComment: {},
    editCommentModalName: '',
    editCommentModalBody: ''
  }

  componentDidMount() {
    this.props.loadAllCommentsByPostIdDispatch(this.props.postId)
  }

  openEditModal = (id) => {
    let filterComment = this.props.comments.filter(comment => comment.id === id);
    this.setState(() => ({
      commentEditModelOpen: true,
      activeComment: filterComment[0],
      editCommentModalName: filterComment[0].author,
      editCommentModalBody: filterComment[0].body
    }
    ))
  }

  closeCommentModal = () => this.setState(() => ({ commentEditModelOpen: false, activeEditCommentId: '' }))

  saveEditComment = () => {
    let editComment = this.state.activeComment;
    editComment.author = this.state.editCommentModalName;
    editComment.body = this.state.editCommentModalBody;
    this.props.editCommentDispatch(this.state.activeComment)
    this.closeCommentModal();
  }

  submitHandler = (e) => {
    e.preventDefault();
    const value = serializeForm(e.target, { hash: true });
    value.parentId = this.props.postId;
    value.timestamp = Date.now();
    value.voteScore = 1;
    value.id = uuid.v1();
    this.props.addCommentDispatch(value);
    this.clearAddCommentForm();
    this.toggleNewComment()
  }

  clearAddCommentForm = () => {
    this.addAuthor.value = '';
    this.addBody.value = '';
  }

  onOrderChange = (e) => {
    this.setState({
      commentOrder: e
    })
  }

  deleteCommentHandler = (id) => {
    this.props.deleteCommentDispatch(id)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  toggleNewComment = () => {
    this.setState({
      showNewComment: !this.state.showNewComment
    })
  }
  render() {
    let { comments } = this.props
    if (comments && comments.length > 0) {
      comments.sort(sortBy(this.state.commentOrder))
    }
    return (
      <div className="comment-section">
        <div className="app-flex app-justify-space">
          <h2 className="m-0"> Comment </h2>
          <div className="">
            <OrderDropDown defaultValue={this.state.commentOrder} sortChange={this.onOrderChange} />
          </div>
        </div>
        <div className="add-wrapper" >
          <Button basic color='green' onClick={this.toggleNewComment}><Icon name='add' />Add New Comment</Button>
        </div>
        {this.state.showNewComment &&
          <div className="add-comment-container">
            <h3>Add Comment</h3>
            <form className="ui form" onSubmit={this.submitHandler} >
              <div className="bk-inline-form">
                <label>User</label>
                <div className="ui input">
                  <input type="text" name="author" ref={(input) => this.addAuthor = input} />
                </div>
              </div>
              <div className="bk-inline-form">
                <label>Body</label>
                <textarea className="textarea" name="body" ref={(input) => this.addBody = input}></textarea>
              </div>
              <Button.Group >
                <Button type="button" onClick={this.clearAddCommentForm}> Clear</Button>
                <Button.Or />
                <Button positive type="submit"> Comment</Button>
              </Button.Group>
            </form>
          </div>
        }
        <Card.Group>
        {comments && comments.length > 0 && comments.map((comment) => (
          <SingleComment key={comment.id} comment={comment} openEditModal={this.openEditModal}
            deleteCommentHandler={this.deleteCommentHandler} triggerCommentVoteScore={this.props.changeCommentScoreDispatch} />
        ))}
        </Card.Group>
        <Modal size="small" open={this.state.commentEditModelOpen} onClose={this.closeCommentModal}>
          <Modal.Header>EDIT Comment</Modal.Header>
          <Modal.Content>
            <Form>
              <div className="bk-inline-form">
                <label>User</label>
                <input name="editCommentModalName" type="text" value={this.state.editCommentModalName || ''} onChange={this.handleChange} />
              </div>
              <div className="bk-inline-form">
                <label>Body</label>
                <TextArea name="editCommentModalBody" type="text" value={this.state.editCommentModalBody || ''} onChange={this.handleChange} />
              </div>
              <Button.Group>
                <Button onClick={this.closeCommentModal}>Cancel</Button>
                <Button.Or />
                <Button positive onClick={this.saveEditComment}>Save</Button>
              </Button.Group>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    comments: state.posts.comments[ownProps.postId]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadAllCommentsByPostIdDispatch: (id) => {
      dispatch(loadAllCommentsByPostId(id))
    },
    changeCommentScoreDispatch: (comment, status) => {
      dispatch(commentVoteScore(comment, status))
    },
    addCommentDispatch: (comment) => {
      dispatch(addComment(comment))
    },
    editCommentDispatch: (comment) => {
      dispatch(editComment(comment))
    },
    deleteCommentDispatch: (id) => {
      dispatch(deleteComment(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentBox)