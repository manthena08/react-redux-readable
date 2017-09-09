import React, { Component } from 'react'
import * as uuid from 'react-native-uuid'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import { Button, Input, TextArea, Form, Container, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { addNewPost } from '../../actions/posts'
import { loadCategories } from '../../actions/categories'
import CategoryDropDown from '../common/CategoryDropDown'

class CreatePostPage extends Component {
  static propTypes = {
    addNewPostDispatch: PropTypes.func.isRequired
  }

  state = {
    addPostForm: {}
  }

  componentDidMount() {
    if (this.props.categories.length == 0) {
      this.props.loadCategoriesDispatch();
    }
  }
  //  for submit for creating new post
  onSubmitHandler = (e) => {
    e.preventDefault();
    const value = Object.assign({}, this.state.addPostForm);
    value.timestamp = Date.now();
    value.voteScore = 1;
    value.id = uuid.v1();
    this.props.addNewPostDispatch(value)
    this.props.history.push('/')
  }
  // Update the form elements
  handleChange = (e, { name, value }) => {
    this.setState((prevState, props) => {
      return Object.assign(prevState.addPostForm, {
        [name]: value
      })
    })
  }

  handleCategoryChange = (e) => {
    let value = e;
    this.setState((prevState, props) => {
      return Object.assign(prevState.addPostForm, {
        category: value
      })
    })
  }

  // Clear all the form elements
  onClearHandler = () => {
    this.setState({ addPostForm: {} })
  }

  render() {
    let { title, author, category, body } = this.state.addPostForm
    return (
      <div className="create-post-page">
        <Container>
          <h1> <Icon className="back-arrow" size="small" name="arrow left" onClick={() => this.props.history.goBack()} /> Create New Post</h1>
          <Form onSubmit={this.onSubmitHandler} >
            <div className="bk-inline-form">
              <label>Title</label>
              <Input name="title" type="text" value={title || ''} onChange={this.handleChange} />
            </div>
            <div className="bk-inline-form">
              <label>Author</label>
              <Input name="author" type="text" value={author || ''} onChange={this.handleChange} />
            </div>
            <CategoryDropDown firstValue="" changeCategory={this.handleCategoryChange} categories={this.props.categories}/>
            <div className="bk-inline-form">
              <label>Body</label>
              <div className="ui input">
                <TextArea name="body" type="text" value={body || ''} onChange={this.handleChange} />
              </div>
            </div>
            <div className="create-page-action-group">
              <Button.Group floated="right">
                <Button type="button" onClick={this.onClearHandler}>Clear</Button>
                <Button.Or />
                <Button positive onClick={this.saveEditPost}>Save</Button>
              </Button.Group>
            </div>
          </Form>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categoriesList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewPostDispatch: (post) => {
      dispatch(addNewPost(post))
    },
    loadCategoriesDispatch: () => {
      dispatch(loadCategories())
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreatePostPage)