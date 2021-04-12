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
  console.log('blog is', blog)
  console.log('user is', user)
  return (
    <div style={blogStyle}>
      <span>{blog.title} {blog.author}</span>
      <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'show'}</button>
      {showDetails && (
        <>
          <p>{blog.url}</p>
          <span>likes: {blog.likes}</span>
          <button onClick={() => addLike()}>like</button>
          <p>{blog.user.name}</p>
          {user.username === blog.user.username && (
            <button onClick={() => deleteBlog(blog)}>delete</button>
          )}
        </>
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