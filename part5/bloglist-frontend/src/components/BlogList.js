import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, updateBlog, deleteBlog, user }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog => {
        return <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}/>
      }
      )}
    </div>
  )
}
BlogList.propTypes = {
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default BlogList


