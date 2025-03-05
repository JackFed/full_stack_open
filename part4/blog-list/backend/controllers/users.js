const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

usersRouter.post('/', async (request, response) => {
  const { name, username, password } = request.body

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