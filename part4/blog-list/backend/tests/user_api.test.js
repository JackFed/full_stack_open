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
    test.only('Add a valid user', async () => {
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
})

after(async () => {
  await mongoose.connection.close()
})