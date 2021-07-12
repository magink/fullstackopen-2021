import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const addLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(updatedBlog.id, updatedBlog)
  }
  return (
    <div data-cy="blog-entry" style={blogStyle}>
      <span>{blog.title}</span>
      <span> by {blog.author}</span>
      <button data-cy="toggle-details-button" onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'show'}</button>
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <span data-cy="blog-likes">likes: {blog.likes}</span>
          <button data-cy="like-button" onClick={() => addLike()}>like</button>
          <p>{blog.user.name}</p>
          {user.username === blog.user.username && (
            <button data-cy="delete-button" onClick={() => deleteBlog(blog)}>delete</button>
          )}
        </div>
      )}
    </div>
  )
}
Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,

}

export default Blog