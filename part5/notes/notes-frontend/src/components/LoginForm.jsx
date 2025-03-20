import { useState } from "react"

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()
    loginUser({
      username,
      password
    })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={login}>
      <div>
        username
          <input
          type="text"
          value={username}
          data-testid="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          data-testid="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">log in</button>
    </form>      
  )
}

export default LoginForm