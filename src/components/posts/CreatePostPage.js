import React, { Component } from 'react'

import * as uuid from 'react-native-uuid'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import { Button, Input, TextArea, Form } from 'semantic-ui-react'
import { addNewPost } from '../../actions/posts'


class CreatePostPage extends Component {
  state = {}

  onSubmitHandler = (e) => {
    e.preventDefault();
    const value = serializeForm(e.target, { hash: true });
    value.timestamp = Date.now();
    value.voteScore = 1;
    value.id = uuid.v1();
    this.props.addNewPostDispatch(value)
    this.props.history.push('/')
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

onClearHandler = () => {
  this.setState({ title: '', author: '', category: '', body: '' })
}
  render() {
    let {title, author, category, body } = this.state
    return (
      <div>
        <h1>Create New Post</h1>
        <Form onSubmit={this.onSubmitHandler} >
          <div className="bk-inline-form">
            <label>Title</label>
            <Input name="title" type="text" value={title || ''} onChange={this.handleChange}/>
          </div>
          <div className="bk-inline-form">
            <label>Author</label>
            <Input name="author" type="text"  value={author || ''} onChange={this.handleChange}/>
          </div>
          <div className="bk-inline-form">
            <label>Category</label>
            <Input name="category" type="text" value={category || ''} onChange={this.handleChange}/>
          </div>
          <div className="bk-inline-form">
            <label>Body</label>
            <TextArea name="body" type="text" value={body || ''} onChange={this.handleChange}/>
          </div>
          <Button.Group>
            <Button type="button" onClick={this.onClearHandler}>Clear</Button>
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