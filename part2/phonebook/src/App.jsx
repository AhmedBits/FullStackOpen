import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Input from './components/Input'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const clear = () => {
    setNewName('')
    setNewNumber('')
    setNewSearch('')
  }

  const addContact = (event) => {
    event.preventDefault()
    if (nameExists(newName)) {
      alert(`${newName} is already added to phonebook`)
      clear()
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    setPersons(persons.concat(personObject))
    clear()
  }

  const namesToShow = newSearch === ''
    ? persons
    : persons.filter(person => 
      person.name.toLowerCase().includes(newSearch.toLowerCase()))

  const nameExists = (newName) => {
    const name = persons.find(person => person.name === newName)
    return name === undefined ? false : true
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const inputHandlers = {
    handleNameChange,
    handleNumberChange,
    handleSearchChange,
  }

  const states = {
    newName,
    newNumber,
    newSearch,
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Input 
        text='filter shown with '
        handleChange={handleSearchChange}
        value={newSearch}
      />
      <h3>Add a new contact</h3>
      <PersonForm
        handleSubmit={addContact}
        inputHandlers={inputHandlers}
        states={states}
      />
      <h3>Numbers</h3>
      <Persons
        names={namesToShow}
      />
    </div>
  )
}

export default App