const UserBlogs = ({ user, setUser, setMessage }) => {

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setMessage(`${user.username} has logged out`)
    setUser(null)
  }

  return (
    <>
      <p>
        {user.name} is logged in 
        <button onClick={logout}>Log out</button>
      </p>
    </>   
  )
}

export default UserBlogs