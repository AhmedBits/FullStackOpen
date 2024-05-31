import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Input from './components/Input'
import personService from './services/numberService'
import numberService from './services/numberService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
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
    }

    personService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          clear()
        })
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
        handleClick={numberService.deletePerson}
      />
    </div>
  )
}

export default App