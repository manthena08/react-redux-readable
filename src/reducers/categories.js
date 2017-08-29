import { LOAD_CATEGORIES_SUCCESS,LOAD_CATEGORY_POSTS_SUCCESS } from '../actions/categories'

const INITIAL_STATE = {
  categoriesList: [],
  activeCategoryPosts: []
}

export const categories = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        categoriesList: action.categories
      }
    case LOAD_CATEGORY_POSTS_SUCCESS:
    return {
      ...state,
      activeCategoryPosts: action.categoryPosts

    }
      
    default:
      return state
  }
}
