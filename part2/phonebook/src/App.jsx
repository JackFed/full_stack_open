import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  const handleAddName = (event) => {
    event.preventDefault()
    const isDuplicate = persons.some(person => person.name === newName)
    if (isDuplicate) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat({
        name: newName,
        number: newNum
      }))
    }
    setNewName('')
    setNewNum('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter( (person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase())
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        Filter by name: <input onChange={handleFilterChange} />
      </p>
      <form onSubmit={handleAddName}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleNumChange} value={newNum}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map( (person) => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App