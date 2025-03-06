const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
describe('Blog', () => {
  let token = null

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    
    const newUser = {
      name: 'Bill',
      username: 'billyo7',
      password: '1112'
    }
    await helper.createOneUser(newUser)

    const userLogin = await api
      .post('/api/login')
      .send({
        username: newUser.username,
        password: newUser.password
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    token = userLogin.body.token

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

  describe('Create blog', () => {
    test.only('unique is created', async () => {      
      const newBlog = {
        title: "Cool book post",
        author: "Jack Bookman",
        url: "https://github.com/JackFed",
        likes: 1
      }

      const blogsBefore = await helper.blogsInDb()

      await api
        .post('/api/blogs')
        .set({ Authorization: `Bearer ${token}` })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsBefore.length + 1)

      const blogTitles = blogsAtEnd.map(blog => blog.title)
      assert(blogTitles.includes('Cool book post'))
    })

    test('no likes adds likes: 0', async () => {
      const newNoLikeBlog = {
        title: "Cool book post",
        author: "Jack Bookman",
        url: "https://github.com/JackFed"
      }

      const blogsBefore = await helper.blogsInDb()

      await api.post('/api/blogs')
        .set({ Authorization: `Bearer ${token}` })
        .send(newNoLikeBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsBefore.length + 1)

      const newToDb = blogsAtEnd.filter(blog => blog.title === 'Cool book post')
      assert.strictEqual(newToDb[0].likes, 0)
    })

    test.only('no title fails', async () => {
      const newNoTitleBlog = {
        author: "Jack Bookman",
        url: "https://github.com/JackFed",
        likes: 100
      }

      await api.post('/api/blogs')
        .set({ Authorization: `Bearer ${token}` })
        .send(newNoTitleBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test.only('no url fails', async () => {
      const newNoUrlBlog = {
        title: "Cool book post",
        author: "Jack Bookman",
        likes: 10
      }

      await api.post('/api/blogs')
        .set({ Authorization: `Bearer ${token}` })
        .send(newNoUrlBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test.only('no token gets unauthorized', async () => {
      const newBlog = {
        title: "Cool book post",
        author: "Jack Bookman",
        url: "https://github.com/JackFed",
        likes: 1
      }

      await api.post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })
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
})

after(async () => {
  await mongoose.connection.close()
})