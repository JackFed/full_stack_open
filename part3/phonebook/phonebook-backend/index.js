const express = require("express")
const app = express() 
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))


morgan.token('postData', (req, res) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : "";
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

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
    response.json(persons)
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

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    persons = persons.filter(person => person.id.toString() !== id)
    
    response.status(204).end()
})

const generateId = () => {
    return String(Math.floor(Math.random() * 10000));
}

app.post('/api/persons', (request, response) => {
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
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }
    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})