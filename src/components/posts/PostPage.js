import React, { Component } from 'react';
import Moment from 'react-moment'
import sortBy from 'sort-by'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import * as uuid from 'react-native-uuid'
import MdEdit from 'react-icons/lib/md/edit'
import MdDelete from 'react-icons/lib/md/delete'
import SingleComment from '../common/SingleComment'
import VoteScore from '../common/VoteScore'

import {
  loadPostById, loadAllCommentsByPostId, addComment,
  deleteComment, editComment, saveEditedPost, deletePost, voteScore, commentVoteScore
} from '../../actions/posts'

import { Button, Modal, Input, TextArea, Form, Segment, Container } from 'semantic-ui-react'

class PostPage extends Component {
  state = {
    commentOrder: '-voteScore',
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
    debugger;
    const value = serializeForm(e.target, { hash: true });
    value.parentId = this.props.match.params.postId;
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
  closeEditPostModal = () => this.setState(() => ({ postEditModelOpen: false }))
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

  handleVoteScore = (id, vote) => {
    this.props.changeVoteScoreDispatch(this.props.post, vote)
  }
  render() {

    let { post, comments } = this.props
    if(comments && comments.length > 0) {
      comments.sort(sortBy(this.state.commentOrder))
    }

    return (
      <div>
        <Container>
          <h2>Post Page</h2>
          <div className="card">
            <h3>{post.title}</h3>
            <p>{post.author}</p>
            <p>{post.body}</p>
            <Moment format="MMM DD YYYY">{post.timestamp}</Moment>
            <h5>
              <VoteScore handleVoteScore={this.handleVoteScore} postId={post.id} score={post.voteScore}></VoteScore>
            </h5>
            <div className='ui two buttons'>
              <Button basic color='green' onClick={this.openEditPostModal}><MdEdit size={30} /></Button>
              <Button basic color='red' onClick={this.deletePost}><MdDelete size={30} /></Button>
            </div>
          </div>
          <Segment>
            <div className="comment-section">
              <h3>Comment </h3>
              <select value={this.state.commentOrder} onChange={(event) => this.onOrderChange(event)}>
                <option value="-timestamp">Date</option>
                <option value="-voteScore">Score</option>
              </select>
              <form onSubmit={this.submitHandler}>
                <input type="text" name="author" placeholder="comment-name" ref={(input) => this.addAuthor = input} />
                <textarea name="body" ref={(input) => this.addBody = input}></textarea>
                <button type="submit" > Comment</button>
                <button type="button" onClick={this.clearAddCommentForm}> Clear</button>
              </form>
              {comments && comments.length > 0 && comments.map((comment) => (
                    <SingleComment key={comment.id} comment={comment} openEditModal={this.openEditModal}
                    deleteCommentHandler={this.deleteCommentHandler} triggerCommentVoteScore={this.props.changeCommentScoreDispatch} />
              ))}
            </div>
          </Segment>
        </Container>
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
    comments: state.posts.comments[ownProps.match.params.postId]
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
    changeVoteScoreDispatch: (post, option) => {
      dispatch(voteScore(post, option))
    },
    changeCommentScoreDispatch: (comment, status) => {
      dispatch(commentVoteScore(comment, status))
    },
    deletePostDispatch: (id) => {
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