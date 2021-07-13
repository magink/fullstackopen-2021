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
          <label htmlFor='title-input'>title:</label>
          <input id='title-input' data-cy="new-blog-title" type="text" value={title} onChange={handleTitle}/>
        </div>
        <div>
          <label htmlFor="author-input">author:</label>
          <input id='author-input' data-cy="new-blog-author" type="text" value={author} onChange={handleAuthor}/>
        </div>
        <div>
          <label htmlFor="url-input">url:</label>
          <input id='url-input' data-cy="new-blog-url" type="text" value={url} onChange={handleUrl}/>
        </div>
        <button data-cy="new-blog-button" type="submit">create</button>
      </form>
    </>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm