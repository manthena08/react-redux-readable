import * as ReadableAPI from '../util/ReadableAPI'
import * as types from './actionTypes'

export function loadCategories() {
  return function (dispatch) {
    return ReadableAPI.getCategories()
      .then((categories) => {
        dispatch(loadCategoriesSuccess(categories))
      }).catch(error => {
        throw(error)
      })
  }
}

export function loadCategoriesSuccess(categories) {
  return {
    type: types.LOAD_CATEGORIES_SUCCESS,
    categories
  }
}

export function loadCategoryPosts(categoryName) {
  return function (dispatch) {
    return  ReadableAPI.getPostsByCategory(categoryName)
    .then(data => {
        dispatch(loadCategortyPostsSuccess(data))
    }).catch(error => {
      throw(error)
    })
  }
}


export function loadCategortyPostsSuccess(posts) {
  return {
    type: types.LOAD_CATEGORY_POSTS_SUCCESS,
    posts
  }
}