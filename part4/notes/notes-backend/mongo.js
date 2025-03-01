const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const dbName = 'testNoteApp'

const url =
  `mongodb+srv://fullstack:${password}@cluster0.dw8zm.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

console.log(`Connecting to database url: ${url}`)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is the structure of websites',
  important: true,
})

note.save().then(() => {
  console.log('note saved!')
  mongoose.connection.close()
})

// Note.find({ important: true }).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })