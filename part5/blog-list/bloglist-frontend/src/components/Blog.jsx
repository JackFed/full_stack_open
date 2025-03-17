import { useState } from "react"

const Blog = ({ blog, handleLike, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [shown, setShown] = useState(false)

  const toggleShown = () => setShown(!shown)

  const likeBlog = () => {
    handleLike(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
     })
  }

  const removeBlog = () => {
    console.log('removing blog...')
    handleDelete(blog.id)
  }

  return ( 
    <div style={blogStyle}>
      {blog.title} {blog.author} 
      <button onClick={toggleShown}>
        { shown ? 'hide' : 'view'}
      </button>
      {
        shown && 
        <div>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}
            <button onClick={likeBlog}>like</button>
          </div>
          <div>creator: {blog.user.username}</div>
          <button onClick={removeBlog}>remove</button>
        </div>
      }
    </div>  
  )
}

export default Blog