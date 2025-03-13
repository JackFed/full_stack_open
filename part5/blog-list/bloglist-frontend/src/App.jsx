import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    console.log(`Username ${username}, password ${password}`)
  }

  return (
    <div>
      { user === null 
        ? <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin}/>
        : 
          <>
            <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </>     
      }
      
    </div>
  )
}

export default App