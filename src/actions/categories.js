import * as ReadableAPI from '../util/ReadableAPI'
export const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS'
export const LOAD_CATEGORY_POSTS_SUCCESS = 'LOAD_CATEGORY_POSTS_SUCCESS'

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
    type: LOAD_CATEGORIES_SUCCESS,
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


export function loadCategortyPostsSuccess(post) {
  return {
    type: LOAD_CATEGORY_POSTS_SUCCESS,
    categoryPosts: post
  }
}