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

test.only('Create post with no likes', async () => {
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

test.only('Create post with no title', async () => {
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

test.only('Create post with no url', async () => {
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

after(async () => {
  await mongoose.connection.close()
})