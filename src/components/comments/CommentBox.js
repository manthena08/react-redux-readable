import React, { Component } from 'react'
import sortBy from 'sort-by'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import * as uuid from 'react-native-uuid'
import SingleComment from './SingleComment'
import { loadAllCommentsByPostId, addComment, deleteComment, editComment, commentVoteScore } from '../../actions/posts'
import { Button, Modal, TextArea, Form } from 'semantic-ui-react'

class CommentBox extends Component {
  state = {
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
  }

  clearAddCommentForm = () => {
    this.addAuthor.value = '';
    this.addBody.value = '';
  }

  onOrderChange = (e) => {
    this.setState({
      commentOrder: e.target.value
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

  render() {
    let { comments } = this.props
    if (comments && comments.length > 0) {
      comments.sort(sortBy(this.state.commentOrder))
    }
    return (
      <div className="comment-section">
        <h3> Comment </h3>
        <select value={this.state.commentOrder} onChange={(event) => this.onOrderChange(event)}>
          <option value="-timestamp">Date</option>
          <option value="-voteScore">Score</option>
        </select>
        <form onSubmit={this.submitHandler}>
          <input type="text" name="author" placeholder="comment-name" ref={(input) => this.addAuthor = input} />
          <textarea name="body" ref={(input) => this.addBody = input}></textarea>
          <button type="submit"> Comment</button>
          <button type="button" onClick={this.clearAddCommentForm}> Clear</button>
        </form>
        {comments && comments.length > 0 && comments.map((comment) => (
          <SingleComment key={comment.id} comment={comment} openEditModal={this.openEditModal}
            deleteCommentHandler={this.deleteCommentHandler} triggerCommentVoteScore={this.props.changeCommentScoreDispatch} />
        ))}
        <Modal size="small" open={this.state.commentEditModelOpen} onClose={this.closeCommentModal}>
          <Modal.Header>EDIT Comment</Modal.Header>
          <Modal.Content>
            <Form>
              <div className="bk-inline-form">
                <label>Author Name</label>
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