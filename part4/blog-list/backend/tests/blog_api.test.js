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

test.only('Get all blog posts', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)    
})

test.only('Identifier name is id not _id', async () => {
  const response = await api.get('/api/blogs').expect(200)
  const blogs = response.body

  blogs.forEach(blog => {
    assert(blog.hasOwnProperty('id'))
  })
})

test.only('Create new blog', async () => {
  const newBlog = {
    title: "Cool book post",
    author: "Jack Bookman",
    url: "https://github.com/JackFed",
    likes: 1
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const blogTitles = blogsAtEnd.map(blog => blog.title)
  assert(blogTitles.includes('Cool book post'))
})

after(async () => {
  await mongoose.connection.close()
})