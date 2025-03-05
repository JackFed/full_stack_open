const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (val) => val.length >= 3,
      message: 'Username must be at least 3 characters long'
    }
  },
  name: String,
  passwordHash: {
    type: String,
    minlength: 3
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)