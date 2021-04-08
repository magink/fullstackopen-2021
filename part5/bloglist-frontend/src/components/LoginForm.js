import React from 'react'

const LoginForm = ({handleLogin, username, password, handlePasswordChange, handleUsernameChange}) => {
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
export default LoginForm