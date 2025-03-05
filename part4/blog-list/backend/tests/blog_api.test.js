const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let noteObject = new Blog(blog)
    await noteObject.save()
  }
})

test('Get all blog posts', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)    
})

test('Identifier name is id not _id', async () => {
  const response = await api.get('/api/blogs').expect(200)
  const blogs = response.body

  blogs.forEach(blog => {
    assert(blog.hasOwnProperty('id'))
  })
})

test('Create new blog', async () => {
  const newBlog = {
    title: "Cool book post",
    author: "Jack Bookman",
    url: "https://github.com/JackFed",
    likes: 1
  }

  const blogsBefore = await helper.blogsInDb()

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsBefore.length + 1)

  const blogTitles = blogsAtEnd.map(blog => blog.title)
  assert(blogTitles.includes('Cool book post'))
})

test('Create post with no likes', async () => {
  const newNoLikeBlog = {
    title: "Cool book post",
    author: "Jack Bookman",
    url: "https://github.com/JackFed"
  }

  const blogsBefore = await helper.blogsInDb()

  await api.post('/api/blogs')
    .send(newNoLikeBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsBefore.length + 1)

  const newToDb = blogsAtEnd.filter(blog => blog.title === 'Cool book post')
  assert.strictEqual(newToDb[0].likes, 0)
})

test('Create post with no title', async () => {
  const newNoTitleBlog = {
    author: "Jack Bookman",
    url: "https://github.com/JackFed",
    likes: 100
  }

  await api.post('/api/blogs')
    .send(newNoTitleBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('Create post with no url', async () => {
  const newNoUrlBlog = {
    title: "Cool book post",
    author: "Jack Bookman",
    likes: 10
  }

  await api.post('/api/blogs')
    .send(newNoUrlBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('Delete a blog with given id successfully', async () => {
  const beforeBlogs = await helper.blogsInDb()
  const blogToDelete = beforeBlogs[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  
  const endBlogs = await helper.blogsInDb()
  const endIds = endBlogs.map(blog => blog.id)

  assert.strictEqual(beforeBlogs.length - 1, endBlogs.length)
  assert(!endIds.includes(blogToDelete.id))
})

test('Update a blog with a valid id and new like amount', async () => {
  const beforeBlogs = await helper.blogsInDb()
  const blogToUpdate = beforeBlogs[0]
  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1
  }

  await api.put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
  
  const endBlogs = await helper.blogsInDb()

  assert.strictEqual(beforeBlogs.length, endBlogs.length)

  const newToDb = endBlogs.filter(blog => blog.title === blogToUpdate.title)
  assert.strictEqual(blogToUpdate.likes + 1, newToDb[0].likes)
})

after(async () => {
  await mongoose.connection.close()
})