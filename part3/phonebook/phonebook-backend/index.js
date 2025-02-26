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
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons=> {
        response.json(persons)
    }).catch(error => next(error))
})

app.get('/info', (request, response) => {
    
    Person.find({}).then(persons=> {
        const totalPersons = persons.length
        const time = new Date();
        response.send(`<div><p>Phonebook has info for ${totalPersons} people</p><p>${time}</p></div>`)
    }).catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    // Error bad request checking
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name and/or number missing'
        })
    }
    
    // Make and add new person
    const person = new Person({
        name: body.name,
        number: body.number,
    })
    person.save()
        .then(savedPerson => {
            if (savedPerson) response.json(savedPerson)    
        })
        .catch(error => {
            next(error)
        })
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number} = request.body

    Person.findByIdAndUpdate(
        request.params.id, 
        { name, number }, 
        { new:true, runValidators: true, context: 'query' })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => {
            next(error)
        })
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})