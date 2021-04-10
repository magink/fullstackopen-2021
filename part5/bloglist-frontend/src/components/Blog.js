import React, {useState} from 'react'
const Blog = ({blog}) => {
  const [showDetails, setShowDetails] = useState(false)
  console.log(blog);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <span>{blog.title} {blog.author}</span>
      <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'show'}</button> 
      {showDetails && (
        <>
          <p>{blog.url}</p>
          <span>likes: {blog.likes}</span>
          <button>like</button>
          <p>{blog.user.name}</p>
        </>
      )}
    </div>  
  )
}

export default Blog