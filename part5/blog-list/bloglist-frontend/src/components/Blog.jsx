import { useState } from "react"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [shown, setShown] = useState(false)

  const toggleShown = () => setShown(!shown)

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
          <div>likes: {blog.likes}</div>
          <div>creator: {blog.user.username}</div>
        </div>
      }
    </div>  
  )
}

export default Blog