import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateLikes = async (newBlog) => {
  const blogUrl = `${baseUrl}/${newBlog.user.id}`
  const response = await axios.put(blogUrl, newBlog)
  console.log(response)
  return response.data
}

export default { 
  getAll,
  createBlog,
  updateLikes,
  setToken }