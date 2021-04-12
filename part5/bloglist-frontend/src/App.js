import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [warning, setWarning] = useState(false)

  const blogFormRef = useRef()


  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification(`${user.username} successfully logged in`)

    } catch(error) {
      setWarning(true)
      showNotification(`${error.response.data.error}`)
    }
  }
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
    showNotification('Logged out user')
  }
  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)

  useEffect(() => {
    getBlogs()
  }, [])
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const getBlogs = async () => {
    const blogs =
        await blogService.getAll()
    const sortedBlogs =  blogs.sort((a,b) => b.likes - a.likes )
    setBlogs(sortedBlogs)
  }

  const createBlog = async (newBlogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.createBlog(newBlogObject)
      console.log('createdBlog is', createdBlog)
      // setBlogs(blogs.concat((createdBlog)))
      getBlogs()
      showNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)

    } catch (error) {
      console.log(error)
      setWarning(true)
      showNotification(`${error.response.data.error}`)
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      await blogService.updateBlog(id, { ...blogObject, user: blogObject.user.id })
      const updatedBlogs = blogs.map(blog => {
        return blog.id === blogObject.id ? blog = blogObject : blog
      })
      setBlogs(updatedBlogs)
    } catch(error) {
      console.log('error is', error)
    }
  }

  const deleteBlog = async (blog) => {
    const doDelete = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (!doDelete) { return }
    try {
      await blogService.deleteBlog(blog.id)
      getBlogs()
    } catch (error) {
      console.log('error is', error)
    }
  }

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
      setWarning(false)
    }, 10000)
  }

  return (
    <div>
      {notification && (
        <Notification text={notification} warning={warning} />
      )}
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        /> :
        <>
          <p>{user.username}</p>
          <button onClick={handleLogout}>Logout</button>
          <BlogList
            blogs={blogs}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            user={user}/>
          <Toggleable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Toggleable>
        </>
      }
    </div>
  )
}

export default App