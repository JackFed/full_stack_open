const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

mongoose.set('strictQuery', false)

logger.info(`Connecting to db: ${url}`)
mongoose.connect(url)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use('cors')


app.use('/api/blogs', blogRouter)


module.exports = app