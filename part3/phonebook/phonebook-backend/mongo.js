const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('must give: password with optional: name, and number as arguments')
  console.log('ex) node mongo.js yourpassword "Arto Vihavainen" 045-1232456')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.dw8zm.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('Phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(() => {
    console.log(`Added ${name} number: ${number} to phonebook`)
    mongoose.connection.close()
  })
}



