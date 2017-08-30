import React, { Component } from 'react'

import * as uuid from 'react-native-uuid'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import { Button, Input, TextArea, Form } from 'semantic-ui-react'
import { addNewPost } from '../actions/posts'
class CreatePostPage extends Component {


  onSubmitHandler = (e) => {
    e.preventDefault();
    const value = serializeForm(e.target, { hash: true });
    value.timestamp = Date.now();
    value.voteScore = 1;
    value.id = uuid.v1();
    this.props.addNewPostDispatch(value)
    this.props.history.push('/')
  }


  render() {
    return (
      <div>
        <h1>Create New Post</h1>
        <Form onSubmit={this.onSubmitHandler}>
          <div className="bk-inline-form">
            <label>Title</label>
            <Input name="title" type="text" />
          </div>
          <div className="bk-inline-form">
            <label>Author</label>
            <Input name="author" type="text"  />
          </div>
          <div className="bk-inline-form">
            <label>Category</label>
            <Input name="category" type="text" />
          </div>
          <div className="bk-inline-form">
            <label>Body</label>
            <TextArea name="body" type="text"  />
          </div>
          <Button.Group>
            <Button onClick={this.closeEditPostModal}>Clear</Button>
            <Button.Or />
            <Button positive onClick={this.saveEditPost}>Save</Button>
          </Button.Group>
        </Form>
      </div>
    )
  }
}

const mapStateToProps  = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewPostDispatch : (post) => {
      dispatch(addNewPost(post))
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(CreatePostPage)