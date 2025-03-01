const { test, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('database', () => {
  test('notes are returned as json', async () => {
    await api.get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  after(async () => {
    await mongoose.connection.close()
  })

  test('there are two notes', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, 2)
  })

  test('the first note is about Javascript in the browser', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(e => e.content)
    assert.strictEqual(contents.includes('Browser can execute only JavaScript'), true)
  })
})