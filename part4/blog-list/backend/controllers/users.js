const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { name, username, password } = request.body

  if ( password.length < 3 ) {
    return response
      .status(400)
      .json({ error: 'Password must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({ 
    name,
    username,
    passwordHash
  })
  
  const addedUser = await user.save()
  response.status(201).json(addedUser)
})

module.exports = usersRouter