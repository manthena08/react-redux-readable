import * as ReadableAPI from '../util/ReadableAPI'
import * as types from './actionTypes'

export function loadPosts() {
  return function (dispatch) {
    return ReadableAPI.getPosts()
      .then((posts) => {
        dispatch(loadPostSuccess(posts))
      }).catch(error => {
        throw (error)
      })
  }
}

export function loadPostById(postId) {
  return function (dispatch) {
    return ReadableAPI.getPostById(postId)
      .then(data => {
        Object.keys(data).length > 0 ? dispatch(loadPostByIdSuccess(data)) : dispatch(notFoundRoute('notFound'))
      }).catch(error => {
        throw (error)
      })
  }
}

export function addNewPost(post) {
  return function (dispatch) {
    return ReadableAPI.createNewPost(post)
      .then(data => dispatch(addNewPostSuccess(data)))
      .catch(error => {
        throw (error)
      })
  }
}

export function deletePost(id) {
  return function (dispatch) {
    return ReadableAPI.deletePostById(id)
      .then(data => dispatch(deletePostSuccess(id)))
      .catch(error => {
        throw (error)
      })
  }
}

export function saveEditedPost(post) {
  return function (dispatch) {
    return ReadableAPI.saveEditPost(post)
      .then(data => {
        dispatch(saveEditedPostSuccess(data))
      }).catch(error => {
        throw (error)
      })
  }
}

export function voteScore(post, option) {
  return function (dispatch) {
    return ReadableAPI.callPostVoteScore(post.id, option)
      .then(data => {
        const score = option === 'upVote' ? post.voteScore + 1 : post.voteScore - 1
        dispatch(voteScoreSuccess(post, score))
      }).catch(error => {
        throw (error)
      })
  }
}

export function commentVoteScore(comment, option) {
  return function (dispatch) {
    return ReadableAPI.callCommentVoteScore(comment.id, option)
      .then(data => {
        if (data.status === 200) {
          const score = option === 'upVote' ? comment.voteScore + 1 : comment.voteScore - 1
          comment.voteScore = score
          dispatch(commentVoteScoreSuccess(comment))
        } else {
          throw (data)
        }
      }).catch(error => {
        throw (error)
      })
  }
}
// comments
export function loadAllCommentsByPostId(postId) {
  return function (dispatch) {
    return ReadableAPI.getCommentsByPostId(postId)
      .then(data => {
        dispatch(loadAllCommentsByPostIdSuccess(data))
      })
  }
}

export function addComment(comment) {
  return function (dispatch) {
    return ReadableAPI.postComments(comment)
      .then((res) => {
        dispatch(addCommentSuccess(res))
      })
  }
}
export function editComment(comment) {
  return function (dispatch) {
    return ReadableAPI.editComment(comment)
      .then((data) => {
        dispatch(editCommentSuccess(data))
      })
  }
}

export function deleteComment(id) {
  return function (dispatch) {
    return ReadableAPI.deleteComment(id)
      .then((data) => {
        dispatch(deleteCommentSuccess(data))
      })
  }
}

export function loadPostByIdSuccess(post,notFound) {
  return {
    type: types.LOAD_POST_BY_ID_SUCCESS,
    activePost: post,
    notFound : notFound
  }
}

export function loadPostSuccess(posts) {
  return {
    type: types.LOAD_POST_SUCCESS,
    posts
  }
}
export function saveEditedPostSuccess(post) {
  return {
    type: types.SAVE_EDITED_POST_SUCCESS,
    post
  }
}
export function addNewPostSuccess(post) {
  return {
    type: types.ADD_NEW_POST,
    post
  }
}

export function voteScoreSuccess(post, score) {
  return {
    type: types.VOTE_SCORE,
    post,
    score
  }
}

export function commentVoteScoreSuccess(comment, score) {
  return {
    type: types.COMMENT_VOTE_SCORE,
    comment
  }
}

export function deletePostSuccess(id) {
  return {
    type: types.DELETE_POST,
    postId: id
  }
}

// comments
export function loadAllCommentsByPostIdSuccess(comments) {
  return {
    type: types.LOAD_ALL_COMMENTS_BY_POST_ID_SUCCESS,
    comments
  }
}

export function addCommentSuccess(comment) {
  return {
    type: types.ADD_COMMENT_SUCCESS,
    comment
  }
}

export function editCommentSuccess(comment) {
  return {
    type: types.EDIT_COMMENT_SUCCESS,
    comment
  }
}

export function deleteCommentSuccess(comment) {
  return {
    type: types.DELETE_COMMENT_SUCCESS,
    comment
  }
}

export function notFoundRoute(notFound) {
  return {
    type: types.NOT_FOUND_ROUTE,
    notFound
  }
}

export function clearActivePost() {
  return {
    type: types.CLEAR_ACTIVE_POST,
    post: {}
  }
}