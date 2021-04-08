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
      console.log('user is', user);
      setUser(user)
      setUsername('')
      setPassword('')

    } catch(exception) {
      console.log('wrong credentials', exception);
    }
  }
  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
  }
  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
          <pr>{user.username}</pr>
          <button onClick={handleLogout}>Logout</button>
          <BlogList blogs={blogs}/>
          </>
      }
    </div>
  )
}

export default App