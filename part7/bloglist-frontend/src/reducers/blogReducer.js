import blogService from '../services/blogs'
const initialState = []

const sortByLikes = (a1, a2) => a2.votes - a1.votes

const blogReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_BLOGS':
      return action.data.sort(sortByLikes)
    case 'NEW_BLOG':
      return state.concat(action.data)
    default:
      return state
  }
}

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const blog = await blogService.createBlog(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: blog
    })
  }
}
export default blogReducer