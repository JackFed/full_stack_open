import { useState } from "react"

const CreateBlogForm = ({ setBlog, createBlog }) => {
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <p>
          title:
          <input 
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)} />
        </p>
        <p>
          author:
          <input 
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </p>
        <p>
          url:
          <input 
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)} />
        </p>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm