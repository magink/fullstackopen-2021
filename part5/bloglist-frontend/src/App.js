import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      console.log('user token is ', user.token);
      // blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch(exception) {
      console.log('wrong credentials', exception);
    }
  }
  const handleLogout = (event) => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }
  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      // blogService.setToken(user.token)
    }
  },[])

  return (
    <div>
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
          <BlogList blogs={blogs}/>
          </>
      }
    </div>
  )
}

export default App