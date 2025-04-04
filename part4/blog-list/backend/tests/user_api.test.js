const { beforeEach, test, describe, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

describe('When there is initally one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('1112', 10)
    const user = new User({
      name: 'Bill',
      username: 'billyo7',
      passwordHash: passwordHash
    })
    
    await user.save()
  })

  describe('Add user', () => {
    test('Add a valid user', async () => {
      const newUser = {
        name: 'steven',
        username: 'steveniscool',
        password: '1234'
      }
  
      const usersBefore = await helper.usersInDb()
      
      await api.post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAfter = await helper.usersInDb()
      assert.strictEqual(usersAfter.length, usersBefore.length + 1)
  
      const usernames = usersAfter.map(user => user.username)
      assert(usernames.includes(newUser.username))
    })
  })

  test('Creation fails with proper message if username is taken', async () => {
    const newUser = {
      name: 'Bill',
      username: 'billyo7',
      password: '1112'
    }
    
    const usersBefore = await helper.usersInDb()

    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('expected `username` to be unique'))

    const usersAfter = await helper.usersInDb()
    assert.strictEqual(usersAfter.length, usersBefore.length)
  })

  test('Creation fails when username length < 3 ', async () => {
    const newUser = {
      name: 'Timmy',
      username: 'ti',
      password: '11124'
    }
    
    const usersBefore = await helper.usersInDb()

    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()
    assert(result.body.error.includes('Username must be at least 3 characters long'))
    assert.strictEqual(usersAfter.length, usersBefore.length)
  })

  test('Creation fails when password length < 3 ', async () => {
    const newUser = {
      name: 'Doug',
      username: 'doug123',
      password: '14'
    }
    
    const usersBefore = await helper.usersInDb()

    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()
    assert(result.body.error.includes('Password must be at least 3 characters long'))
    assert.strictEqual(usersAfter.length, usersBefore.length)
  })

})

after(async () => {
  await mongoose.connection.close()
})