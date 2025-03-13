import Blog from './Blog'

const UserBlogs = ({ user, blogs }) => {
  return (
    <>
      <p>{user.name} is logged in</p>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>   
  )
}

export default UserBlogs