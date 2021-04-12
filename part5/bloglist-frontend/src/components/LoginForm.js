import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password, handlePasswordChange, handleUsernameChange }) => {
  console.log(username)
  console.log(password)
  console.log()
  return (
    <>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          <span>username</span>
          <input type='text' value={username} name='Username' onChange={handleUsernameChange}/>
        </div>
        <div>
          <span>password</span>
          <input type='text' value={password} name='Username' onChange={handlePasswordChange}/>
        </div>
        <button type="submit" >Login</button>
      </form>
    </>
  )
}
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
}
export default LoginForm