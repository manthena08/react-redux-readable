import {
  LOAD_POST_SUCCESS,
  LOAD_POST_BY_ID_SUCCESS,
  LOAD_ALL_COMMENTS_BY_POST_ID_SUCCESS,
  ADD_COMMENT_SUCCESS,
  EDIT_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  SAVE_EDITED_POST_SUCCESS, ADD_NEW_POST, DELETE_POST, VOTE_SCORE, COMMENT_VOTE_SCORE,
  NOT_FOUND_ROUTE, CLEAR_ACTIVE_POST
} from '../actions/actionTypes'

const INITIAL_STATE = {
  activePost: {},
  posts: [],
  comments: {}
}
export const posts = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOT_FOUND_ROUTE:
      return {
        ...state,
        activePost: Object.assign({}, { notFound: action.notFound })
      }
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
    case VOTE_SCORE:
      return {
        ...state,
        posts: state.posts.map(data => {
          if (data.id === action.post.id) {
            data.voteScore = action.score
          }
          return data
        }),
        activePost: {
          ...action.post,
          voteScore: action.score
        }
      }
    case COMMENT_VOTE_SCORE:
      return {
        ...state,
        comments: Object.assign({}, state.comments, {
          [action.comment.parentId]: state.comments[action.comment.parentId].map(comment => comment.id === action.comment.id ? comment = action.comment : comment)
        })
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.postId)
      }
    case SAVE_EDITED_POST_SUCCESS:
      return {
        ...state,
        activePost: action.post
      }
    case LOAD_ALL_COMMENTS_BY_POST_ID_SUCCESS:
      let ChangedActionComments = action.comments.reduce((acc, current) => {
        acc[current.parentId] ? acc[current.parentId] = acc[current.parentId].concat([current]) : acc[current.parentId] = [current]
        return acc
      }, {})
      return {
        ...state,
        comments: Object.assign({}, state.comments, ChangedActionComments)
      }
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comments: Object.assign({}, state.comments, {
          [action.comment.parentId]: state.comments[action.comment.parentId] ? state.comments[action.comment.parentId].concat([action.comment]) : [action.comment]
        })
      }
    case EDIT_COMMENT_SUCCESS:
      debugger
      return {
        ...state,
        comments: Object.assign({}, state.comments, {
          [action.comment.parentId]: state.comments[action.comment.parentId].map(comment => comment.id === action.comment.id ? comment = action.comment : comment)
        })
      }
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: Object.assign({}, state.comments, { [action.comment.parentId]: state.comments[action.comment.parentId].filter(data => data.id !== action.comment.id) })
      }
    case CLEAR_ACTIVE_POST:
      return {
        ...state,
        activePost: action.post
      }
    default:
      return state

  }
}