import { LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORY_POSTS_SUCCESS, VOTE_SCORE } from '../actions/actionTypes'

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
        activeCategoryPosts: action.posts.filter(data => data.deleted === false)

      }
    case VOTE_SCORE:
      return {
        ...state,
        activeCategoryPosts: state.activeCategoryPosts.map(data => {
          if (data.id === action.post.id) {
            data.voteScore = action.score
          }
          return data
        })
      }

    default:
      return state
  }
}
