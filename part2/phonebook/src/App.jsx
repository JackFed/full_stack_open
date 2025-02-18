import { useState, useEffect } from 'react'
import axios from 'axios'

import Form from './components/Form'
import Input from './components/Input'
import DisplayPeople from './components/DisplayPeople'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('Effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log("response filled")
        setPersons(response.data)
      })
  }, [])

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
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter( (person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase())
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Input description="Filter by name:" handleChange={handleFilterChange} value={filter} />
      <Form newName={newName} newNum={newNum} handleAddName={handleAddName} handleNameChange={handleNameChange} handleNumChange={handleNumChange} />
      <DisplayPeople filter={filter} persons={filteredPersons} />
    </div>
  )
}

export default App