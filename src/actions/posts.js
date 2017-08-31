import * as ReadableAPI from '../util/ReadableAPI'

export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS'
export const LOAD_POST_BY_ID_SUCCESS = 'LOAD_POST_BY_ID_SUCCESS'
export const SAVE_EDITED_POST_SUCCESS = 'SAVE_EDITED_POST_SUCCESS'
//comments
export const LOAD_ALL_COMMENTS_BY_POST_ID_SUCCESS = 'LOAD_ALL_COMMENTS_BY_POST_ID_SUCCESS'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS'
export const ADD_NEW_POST = 'ADD_NEW_POST';
export const DELETE_POST = 'DELETE_POST'
export const VOTE_SCORE = 'VOTE_SCORE';
export const COMMENT_VOTE_SCORE = 'COMMENT_VOTE_SCORE'


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
        dispatch(loadPostByIdSuccess(data))
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
        throw(error)
      })
  }
}

export function deletePost(id) {
  return function (dispatch) {
    return ReadableAPI.deletePostById(id)
      .then(data => dispatch(deletePostSuccess(id)))
      .catch(error => {
        console.log(error)
        throw(error)
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

export function voteScore(post,option) {
  return function (dispatch) { 
    return ReadableAPI.callPostVoteScore(post.id,option)
      .then(data => {
        const score = option === 'upVote' ? post.voteScore + 1 : post.voteScore - 1
        dispatch(voteScoreSuccess(post,score))
      }).catch(error => {
        throw (error)
      })
  }
}

export function commentVoteScore(comment,option) {
  return function (dispatch) { 
    return ReadableAPI.callCommentVoteScore(comment.id,option)
      .then(data => {
        const score = option === 'upVote' ? comment.voteScore + 1 : comment.voteScore - 1
        comment.voteScore = score
        dispatch(commentVoteScoreSuccess(comment))
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

export function loadPostByIdSuccess(post) {
  return {
    type: LOAD_POST_BY_ID_SUCCESS,
    activePost: post
  }
}

export function loadPostSuccess(posts) {
  return {
    type: LOAD_POST_SUCCESS,
    posts
  }
}
export function saveEditedPostSuccess(post) {
  return {
    type: SAVE_EDITED_POST_SUCCESS,
    post
  }
}
export function addNewPostSuccess(post) {
  return {
    type: ADD_NEW_POST,
    post
  }
}

export function voteScoreSuccess(post,score) {
  return {
    type: VOTE_SCORE,
    post,
    score
  }
}

export function commentVoteScoreSuccess(comment,score) {
  return {
    type: COMMENT_VOTE_SCORE,
    comment
  }
}

export function deletePostSuccess(id) {
  return {
    type: DELETE_POST,
    postId: id
  }
}

// comments
export function loadAllCommentsByPostIdSuccess(comments) {
  return {
    type: LOAD_ALL_COMMENTS_BY_POST_ID_SUCCESS,
    comments
  }
}

export function addCommentSuccess(comment){
  return {
    type: ADD_COMMENT_SUCCESS,
    comment
  }
}

export function editCommentSuccess(comment) {
  return {
    type: EDIT_COMMENT_SUCCESS,
    comment
  }
}

export function deleteCommentSuccess(comment) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    comment
  }
}