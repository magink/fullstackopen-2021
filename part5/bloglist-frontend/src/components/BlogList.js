import React from 'react'
import Blog from './Blog'

const BlogList = ({blogs, updateBlog, deleteBlog, user}) => {
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

export default BlogList


