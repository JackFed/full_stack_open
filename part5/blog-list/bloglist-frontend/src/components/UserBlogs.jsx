import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'

const UserBlogs = ({ user, blogs, setUser }) => {

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <>
      <p>
        {user.name} is logged in 
        <button onClick={logout}>Log out</button>
      </p>
      <CreateBlogForm />
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>   
  )
}

export default UserBlogs