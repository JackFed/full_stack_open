import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import UserBlog from './components/UserBlogs'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/Login'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [statusMessage, setStatusMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogs )
    })  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`Now logged in as: ${user.username}`)
    } catch (exception) {
      setMessage('Wrong username or password')
    }
  }

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.createBlog(blog)
      setBlogs([...blogs, newBlog])
      setMessage(`Added new blog: ${newBlog.title} by ${newBlog.author}`)
    } catch (error) {
      setMessage('Blog needs a title, author, and url')
    }
  }

  const handleLike = async (id, blog) => {
    try {
      const newBlog = await blogService.updateLikes(id, blog)
      setBlogs(blogs.map(blog => blog.id === id ? newBlog : blog))
    } catch (error) {
      setMessage(error.message)
    }
  }

  const setMessage = (message) => {
    setStatusMessage(message)
    setTimeout(() => {
      setStatusMessage(null)
    }, 5000)
  }

  return (
    <div>
      {statusMessage !== null && <h3>{statusMessage}</h3>}
      { user === null 
        ? <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin}/>
        : <div>
            <UserBlog user={user} setUser={setUser} setMessage={setMessage} />
            <Togglable buttonLabel='create' ref={blogFormRef}>
              <CreateBlogForm createBlog={createBlog} />
            </Togglable>
            <h2>Blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} handleLike={handleLike} />
            )}
          </div>           
      }
      
    </div>
  )
}

export default App