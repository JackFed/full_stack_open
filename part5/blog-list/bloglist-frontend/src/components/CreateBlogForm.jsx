const CreateBlogForm = () => {

  return (
    <div>
      <h2>Create new</h2>
      <form>
        <p>
          title:
          <input type="text" />
        </p>
        <p>
          author:
          <input type="text" />
        </p>
        <p>
          url:
          <input type="text" />
        </p>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm