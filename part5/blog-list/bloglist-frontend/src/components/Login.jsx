const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <p>
          username
          <input 
            type="text"
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)} />
        </p>
        <p>
          password
          <input 
            type="password"
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)} />
        </p>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm