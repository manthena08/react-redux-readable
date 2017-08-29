import React, { Component } from 'react';
import * as ReadableAPI from '../util/ReadableAPI'
import Moment from 'react-moment'
import sortBy from 'sort-by'
import serializeForm from 'form-serialize'
import * as uuid from 'react-native-uuid'

import SingleComment from './SingleComment'
import { connect } from 'react-redux'
import { loadPostById, loadAllCommentsByPostId, addComment, deleteComment, editComment } from '../actions/posts'

import { Card, Button, Modal, Input, TextArea, Form } from 'semantic-ui-react'

class PostPage extends Component {
  state = {
    commentOrder: 'voteScore',
    commentEditModelOpen: false,
    activeComment: {},
    editModalName: '',
    editModalBody: ''
  }

  componentDidMount() {
    this.props.loadPostByIdDispatch(this.props.match.params.postId)
    this.props.loadAllCommentsByPostIdDispatch(this.props.match.params.postId)
  }

  submitHandler = (e) => {
    e.preventDefault();
    const value = serializeForm(e.target, { hash: true });
    value.parentId = this.props.post.id;
    value.timestamp = Date.now();
    value.voteScore = 1;
    value.id = uuid.v1();
    this.props.addCommentDispatch(value);

  }

  onOrderChange = (e) => {
    this.setState({
      commentOrder: e.target.value
    })
  }

  deleteCommentHandler = (id) => {
    this.props.deleteCommentDispatch(id)
  }

  openEditModal = (id) => {
    let filterComment = this.props.comments.filter(comment => comment.id === id);
    this.setState(() => ({
      commentEditModelOpen: true,
      activeComment: filterComment[0],
      editModalName: filterComment[0].author,
      editModalBody: filterComment[0].body
    }
    ))
  }
  closeEditModal = () => this.setState(() => ({ commentEditModelOpen: false, activeEditCommentId: '' }))
  saveEditComment = () => {
    let editComment = this.state.activeComment;
    editComment.author = this.state.editModalName;
    editComment.body = this.state.editModalBody;
    this.props.editCommentDispatch(this.state.activeComment)
    this.closeEditModal();
  }
  EditCommentModalMount = () => {
    this.editName.value = this.state.activeComment.author;
    this.editBody.value = this.state.activeComment.body;
  }
  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }
  render() {

    let { post, comments } = this.props
    comments.sort(sortBy(this.state.commentOrder))

    return (
      <div>
        <h2>Post Page</h2>
        <div className="card">
          <h3>{post.title}</h3>
          <p>{post.author}</p>
          <p>{post.body}</p>
          <Moment format="MMM DD YYYY">{post.timestamp}</Moment>
          <h5>{post.voteScore}</h5>
        </div>
        <div className="comment-section">
          <h3>Comment </h3>
          <select value={this.state.commentOrder} onChange={(event) => this.onOrderChange(event)}>
            <option value="timestamp">Date</option>
            <option value="-voteScore">Score</option>
          </select>
          <form onSubmit={this.submitHandler}>
            <input type="text" name="author" placeholder="comment-name" />
            <textarea name="body"></textarea>
            <button type="submit" > Comment</button>
            <button type="button"> Cancel</button>
          </form>
          {comments.length > 0 && comments.map((comment) => (
            <SingleComment key={comment.id} comment={comment} openEditModal={this.openEditModal} deleteCommentHandler={this.deleteCommentHandler}></SingleComment>
          ))}
        </div>
        <Modal size="small" open={this.state.commentEditModelOpen} onClose={this.closeEditModal} onOpen={this.EditCommentModalMount}>
          <Modal.Header>EDIT Comment</Modal.Header>
          <Modal.Content>
            <Form>
              <div className="bk-inline-form">
                <label>Author Name</label>
                <input name="editModalName" type="text" value={this.state.editModalName || ''} onChange={this.handleChange} />
              </div>
              <div className="bk-inline-form">
                <label>Body</label>
                <TextArea name="editModalBody" type="text" value={this.state.editModalBody || ''} onChange={this.handleChange} />
              </div>
              <Button.Group>
                <Button onClick={this.closeEditModal}>Cancel</Button>
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
    post: state.posts.activePost,
    comments: state.posts.comments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPostByIdDispatch: (id) => {
      dispatch(loadPostById(id))
    },
    loadAllCommentsByPostIdDispatch: (id) => {
      dispatch(loadAllCommentsByPostId(id))
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

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)