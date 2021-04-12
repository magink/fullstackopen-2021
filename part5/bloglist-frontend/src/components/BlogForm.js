import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleTitle = (event) => setTitle(event.target.value)
  const handleAuthor = (event) => setAuthor(event.target.value)
  const handleUrl = (event) => setUrl(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlogObject = {
      title: title,
      author: author,
      url: url
    }
    createBlog(newBlogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h1>Create new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <span>title:</span>
          <input type="text" value={title} onChange={handleTitle}/>
        </div>
        <div>
          <span>author:</span>
          <input type="text" value={author} onChange={handleAuthor}/>
        </div>
        <div>
          <span>url:</span>
          <input type="text" value={url} onChange={handleUrl}/>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm