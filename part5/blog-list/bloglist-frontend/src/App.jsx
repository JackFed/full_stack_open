import { useState, useEffect } from 'react'
import UserBlog from './components/UserBlogs'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const[errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loginData = await loginService.login({
        username,
        password
      })
      setUser(loginData)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      {errorMessage === null && <p>{errorMessage}</p>}
      { user === null 
        ? <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin}/>
        : 
          <UserBlog user={user} blogs={blogs} />   
      }
      
    </div>
  )
}

export default App