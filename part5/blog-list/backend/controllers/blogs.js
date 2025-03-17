const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body
  const user = request.user
  if ( !user ) {
    return response.status(401).json({ error: 'No token given' })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if ( user._id.toString() !== blog.user.toString() ) {
    return response.status(403).json({ error: 'You are not authorized to delete this resource' })
  }
  
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes, user } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes, user },
    {new: true, runValidators: true}
  ).populate('user', {username: 1, name: 1 })
  
  if (!updatedBlog) {
    return response.status(404).json({ error: 'Blog not found'})
  }

  response.json(updatedBlog)
})

module.exports = blogsRouter