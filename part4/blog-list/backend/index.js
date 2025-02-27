const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const Blog = require('./models/blog')
const blogRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const { PORT, MONGODB_URI } = require('./utils/config')

logger.info(`Connecting to db: ${MONGODB_URI}`)
mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
