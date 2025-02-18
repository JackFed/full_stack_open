import { useState, useEffect } from 'react'

import Form from './components/Form'
import Input from './components/Input'
import DisplayPeople from './components/DisplayPeople'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleAddName = (event) => {
    event.preventDefault()
    const isDuplicate = persons.some(person => person.name === newName)
    if (isDuplicate) {
      const changeNum = confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      if (changeNum) {
        const personToChange = persons.filter(person => person.name === newName)[0] // Filter keeps person in array
        const changedP = { ...personToChange, number: newNum }
        console.log(personToChange, changedP)
        personService
          .updateNumber(changedP.id, changedP)
          .then(() => {
            setPersons(persons.map(p => p.id === changedP.id ? changedP : p))
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNum
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
      
    }
    setNewName('')
    setNewNum('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (person) => {
    const confirmDel = confirm(`Delete ${person.name}?`)
    if (confirmDel) {
      personService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    } else {
      console.log(`${person.name} not deleted`)
    }

    
  }

  const filteredPersons = persons.filter( (person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase())
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Input description="Filter by name:" handleChange={handleFilterChange} value={filter} />
      <Form newName={newName} newNum={newNum} handleAddName={handleAddName} handleNameChange={handleNameChange} handleNumChange={handleNumChange} />
      <DisplayPeople filter={filter} persons={filteredPersons} deletePerson={handleDelete}/>
    </div>
  )
}

export default App