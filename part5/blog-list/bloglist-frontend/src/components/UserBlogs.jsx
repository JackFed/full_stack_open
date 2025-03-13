import Blog from './Blog'

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
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>   
  )
}

export default UserBlogs