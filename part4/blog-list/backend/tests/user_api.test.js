const { beforeEach, test, describe, after } = require('node:test')
const { assert } = require('node:assert')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../controllers/users')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

describe('Add user', () => {
  test.only('Add a valid user', async () => {
    const user = {
      name: 'steven',
      username: 'steveniscool',
      password: '1234'
    }



  })
})