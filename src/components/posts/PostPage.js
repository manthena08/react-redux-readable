import React, { Component } from 'react';
import Moment from 'react-moment'
import { connect } from 'react-redux'
import MdEdit from 'react-icons/lib/md/edit'
import MdDelete from 'react-icons/lib/md/delete'
import CommentBox from '../comments/CommentBox'
import VoteScore from '../common/VoteScore'

import { loadPostById,saveEditedPost, deletePost, voteScore } from '../../actions/posts'
import { Button, Modal, Input, TextArea, Form, Container } from 'semantic-ui-react'

class PostPage extends Component {
  state = {
    postEditModelOpen: false,
    editPostModalTitle: '',
    editPostModalAuthor: '',
    editPostModalBody: ''
  }

  componentDidMount() {
    this.props.loadPostByIdDispatch(this.props.match.params.postId)
  }

  deletePost = () => {
    this.props.deletePostDispatch(this.props.post.id)
    this.props.history.push('/')
  }

  openEditPostModal = () => {
    this.setState(() => ({
      postEditModelOpen: true,
      editPostModalTitle: this.props.post.title,
      editPostModalAuthor: this.props.post.author,
      editPostModalBody: this.props.post.body
    }))
  }

  closeEditPostModal = () => this.setState(() => ({ postEditModelOpen: false }))

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
    let { post } = this.props

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
          {post.id ? <CommentBox postId={post.id} /> : ''}
        </Container>
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
    post: state.posts.activePost
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPostByIdDispatch: (id) => {
      dispatch(loadPostById(id))
    },
    saveEditedPostDispatch: (post) => {
      dispatch(saveEditedPost(post))
    },
    changeVoteScoreDispatch: (post, option) => {
      dispatch(voteScore(post, option))
    },
    deletePostDispatch: (id) => {
      dispatch(deletePost(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)