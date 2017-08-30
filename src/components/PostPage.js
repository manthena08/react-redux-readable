import React, { Component } from 'react';
import * as ReadableAPI from '../util/ReadableAPI'
import Moment from 'react-moment'
import sortBy from 'sort-by'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import * as uuid from 'react-native-uuid'
import MdEdit from 'react-icons/lib/md/edit'
import MdDelete from 'react-icons/lib/md/delete'
import SingleComment from './SingleComment'

import { loadPostById, loadAllCommentsByPostId, addComment, deleteComment, editComment,saveEditedPost,deletePost } from '../actions/posts'

import { Card, Button, Modal, Input, TextArea, Form, Segment, Divider } from 'semantic-ui-react'

class PostPage extends Component {
  state = {
    commentOrder: 'voteScore',
    commentEditModelOpen: false,
    postEditModelOpen: false,
    activeComment: {},
    editCommentModalName: '',
    editCommentModalBody: '',
    editPostModalTitle: '',
    editPostModalAuthor: '',
    editPostModalBody: ''
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

  deletePost = () => {
    console.log("dle6e function called")
    this.props.deletePostDispatch(this.props.post.id)
    this.props.history.push('/')
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
  openEditPostModal = () => {
    this.setState(() => ({
      postEditModelOpen: true,
      editPostModalTitle: this.props.post.title,
      editPostModalAuthor: this.props.post.author,
      editPostModalBody: this.props.post.body
    }))
  }
  closeCommentModal = () => this.setState(() => ({ commentEditModelOpen: false, activeEditCommentId: '' }))
  closeEditPostModal = () => this.setState(() => ({postEditModelOpen: false}))
  saveEditComment = () => {
    let editComment = this.state.activeComment;
    editComment.author = this.state.editCommentModalName;
    editComment.body = this.state.editCommentModalBody;
    this.props.editCommentDispatch(this.state.activeComment)
    this.closeCommentModal();
  }
  saveEditPost = () => {
    let editPost = this.props.post;
    editPost.title = this.state.editPostModalTitle
    editPost.author = this.state.editPostModalAuthor;
    editPost.body = this.state.editPostModalBody;
    this.props.saveEditedPostDispatch(editPost);
    this.closeEditPostModal();
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
          <div className='ui two buttons'>
            <Button basic color='green' onClick={this.openEditPostModal}><MdEdit size={30} /></Button>
            <Button basic color='red' onClick={this.deletePost}><MdDelete size={30} /></Button>
          </div>
        </div>
        <Segment>
          <div className="comment-section">
            <h3>Comment </h3>
            <select value={this.state.commentOrder} onChange={(event) => this.onOrderChange(event)}>
              <option value="timestamp">Date</option>
              <option value="-voteScore">Score</option>
            </select>
            <form onSubmit={this.submitHandler}>
              <input type="text" name="author" placeholder="comment-name" ref={(input) => this.addAuthor = input} />
              <textarea name="body" ref={(input) => this.addBody = input}></textarea>
              <button type="submit" > Comment</button>
              <button type="button" onClick={this.clearAddCommentForm}> Clear</button>
            </form>
            {comments.length > 0 && comments.map((comment) => (
              <SingleComment key={comment.id} comment={comment} openEditModal={this.openEditModal} deleteCommentHandler={this.deleteCommentHandler}></SingleComment>
            ))}
          </div>
          <Divider section />
        </Segment>

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
        <Modal size="small" open={this.state.postEditModelOpen} onClose={this.closeEditPostModal} >
          <Modal.Header>EDIT Post</Modal.Header>
          <Modal.Content>
            <Form>
              <div className="bk-inline-form">
                <label>Title</label>
                <Input name="editPostModalTitle" type="text" value={this.state.editPostModalTitle || ''} onChange={this.handleChange} />
              </div>
              <div className="bk-inline-form">
                <label>Author</label>
                <Input name="editPostModalAuthor" type="text" value={this.state.editPostModalAuthor || ''} onChange={this.handleChange} />
              </div>
              <div className="bk-inline-form">
                <label>Body</label>
                <TextArea name="editPostModalBody" type="text" value={this.state.editPostModalBody || ''} onChange={this.handleChange} />
              </div>
              <Button.Group>
                <Button onClick={this.closeEditPostModal}>Cancel</Button>
                <Button.Or />
                <Button positive onClick={this.saveEditPost}>Save</Button>
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
    saveEditedPostDispatch: (post) => {
      dispatch(saveEditedPost(post))
    },
    deletePostDispatch : (id) => {
      dispatch(deletePost(id))
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