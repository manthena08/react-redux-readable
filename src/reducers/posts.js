import {
  LOAD_POST_SUCCESS,
  LOAD_POST_BY_ID_SUCCESS,
  LOAD_ALL_COMMENTS_BY_POST_ID_SUCCESS,
  ADD_COMMENT_SUCCESS,
  EDIT_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  SAVE_EDITED_POST_SUCCESS, ADD_NEW_POST, DELETE_POST
} from '../actions/posts'

const INITIAL_STATE = {
  activePost: {},
  posts: [],
  comments: []
}
export const posts = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        posts: action.posts.filter(data => data.deleted === false)
      }
    case LOAD_POST_BY_ID_SUCCESS:
      return {
        ...state,
        activePost: action.activePost
      }
    case ADD_NEW_POST:
      return {
        ...state,
        posts: state.posts.concat([action.post])
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post =>  post.deleted === false)
      }
    case SAVE_EDITED_POST_SUCCESS:
      return {
        ...state,
        activePost: action.post
      }
    case LOAD_ALL_COMMENTS_BY_POST_ID_SUCCESS:
      return {
        ...state,
        comments: action.comments
      }
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.concat([action.comment])
      }
    case EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.map(comment => comment.id == action.comment.id ? comment = action.comment : comment)
      }
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.comment.id)
      }
    default:
      return state

  }
}