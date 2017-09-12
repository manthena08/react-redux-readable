import React, { Component } from 'react';
import Moment from 'react-moment'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import CommentBox from '../comments/CommentBox'
import VoteScore from '../common/VoteScore'

import { loadPostById, saveEditedPost, deletePost, voteScore, clearActivePost } from '../../actions/posts'
import { loadCategories } from '../../actions/categories'
import { Button, Modal, Input, TextArea, Form, Container, Icon } from 'semantic-ui-react'
import CategoryDropDown from '../common/CategoryDropDown'

class PostPage extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    loadPostByIdDispatch: PropTypes.func.isRequired,
    saveEditedPostDispatch: PropTypes.func.isRequired,
    changeVoteScoreDispatch: PropTypes.func.isRequired,
    deletePostDispatch: PropTypes.func.isRequired,
    clearActivePostDispatch: PropTypes.func.isRequired
  }

  state = {
    postEditModelOpen: false,
    editPostModalTitle: '',
    editPostModalAuthor: '',
    editPostModalBody: '',
    editPostModalCategory: ''
  }

  componentDidMount() {
    this.props.loadPostByIdDispatch(this.props.match.params.postId);
    if (this.props.categories.length === 0) {
      this.props.loadCategoriesDispatch()
    }
  }

  // componentWillUpdate() {
  //   debugger;
  //    ? this.props.history.push('/notFound') : null
  // }

  componentWillUnmount() {
    this.props.clearActivePostDispatch();
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
      editPostModalBody: this.props.post.body,
      editPostModalCategory: this.props.post.category
    }))
  }

  closeEditPostModal = () => this.setState(() => ({ postEditModelOpen: false }))

  saveEditPost = () => {
    let editPost = Object.assign({}, this.props.post, {
      title: this.state.editPostModalTitle,
      author: this.state.editPostModalAuthor,
      body: this.state.editPostModalBody,
      category: this.state.editPostModalCategory
    });
    this.props.saveEditedPostDispatch(editPost);
    this.closeEditPostModal();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCategoryChange = (e) => {
    this.setState({
      editPostModalCategory: e
    })
  }

  handleVoteScore = (id, vote) => {
    this.props.changeVoteScoreDispatch(this.props.post, vote)
  }

  render() {
    let { post } = this.props
    if (this.props.post.hasOwnProperty('notFound')) {
      return (
        <Redirect to='/notFound'/>
      )
    }
    return (
      <div className="post-view-post">
        <Container>
          {post ?
            <div className="post-view-post-details">
              <div className="post-view-details">
                <Icon size="big" name="user circle outline" />
                <div className="post-view-author-details">
                  <div>{post.author ? post.author.toUpperCase() : ''}</div>
                  <div className="text-lighter">
                    Category: {post.category}
                    <span className="m-l-5"><Moment format="MMM DD YYYY">{post.timestamp}</Moment></span>
                  </div>
                </div>
              </div>
              <div className="post-view-title-header">
                <h1>{post.title}</h1>

                <div className='post-action'>
                  <Icon color="green" size="large" name="edit" onClick={this.openEditPostModal}></Icon>
                  <Icon color="red" size="large" name="delete" onClick={this.deletePost}></Icon>
                </div>
              </div>
              <p>{post.body}</p>
              <div>
                <VoteScore handleVoteScore={this.handleVoteScore} postId={post.id} score={post.voteScore || 0}></VoteScore>
              </div>

            </div> : ''}
          <div className="post-view-comments">
            {post.id ? <CommentBox postId={post.id} /> : ''}
          </div>
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
              <CategoryDropDown selectCategeory={this.state.editPostModalCategory || this.props.post.category} changeCategory={this.handleCategoryChange} categories={this.props.categories} />
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
    categories: state.categories.categoriesList
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
    },
    loadCategoriesDispatch: () => {
      dispatch(loadCategories())
    },
    clearActivePostDispatch: () => {
      dispatch(clearActivePost())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)