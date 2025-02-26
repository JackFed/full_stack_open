const express = require("express")
const app = express() 
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')
const note = require("../../notes/notes-backend/models/note")

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))


morgan.token('postData', (req, res) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : "";
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

const errorHandler = (error, request, response, next) => {
    console.log(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } 
    next(error)
}

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons=> {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    const totalPersons = persons.length;
    const time = new Date();

    response.send(`<div><p>Phonebook has info for ${totalPersons} people</p><p>${time}</p></div>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const generateId = () => {
    return String(Math.floor(Math.random() * 10000));
}

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    // Error bad request checking
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name and/or number missing'
        })
    }
    const dupes = persons.filter(person => person.name === body.name)
    if (dupes.length > 0) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    // Make and add new person
    const person = new Person({
        name: body.name,
        number: body.number,
    })
    
    person.save().then(savedPerson => {
        response.json(savedPerson)    
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, body, {new:true})
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})