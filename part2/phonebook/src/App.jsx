import { useState, useEffect } from 'react'
import personService from './services/personService'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Input from './components/Input'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

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

  const createNotification = (message, type) => {
    setNotification(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotification(null)
      setNotificationType(null)
    }, 5000)
  }

  const addContact = (event) => {
    event.preventDefault()
    if (nameExists(newName)) {
      if (
        confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      ) {
        const personToUpdate = persons.find(p => p.name === newName)
        const personObject = {...personToUpdate, number: newNumber}
        
        personService
          .update(personObject, personObject.id)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== personObject.id ? p : returnedPerson))
              createNotification(
                `Changed ${returnedPerson.name}'s number`,
                'success'
              )
            })
            .catch(error => {
              if (error.response.data.error) {
                createNotification(
                  `${error.response.data.error}`,
                  'error'
                )
              } else {
                setPersons(persons.filter(p => p.id !== personObject.id))
                createNotification(
                  `${personObject.name} was already deleted from the server`,
                  'error'
                )
              }
            })
      }
      clear()
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }
    
    if (!newName || !newNumber) {
      createNotification(
        'Must include a name and number',
        'error'
      )
      return
    }

    personService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          createNotification(
            `Added ${returnedPerson.name}`,
            'success'
          )
          clear()
        })
        .catch(error => {
          createNotification(
            `${error.response.data.error}`,
            'error'
          )
        })
  }

  const deleteContact = id => {
    const personToDelete = persons.find(p => p.id === id)

    if (confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(id)
        .then(response => {
          createNotification(
            `Deleted ${personToDelete.name}`,
            'success'
          )
        })
        .catch(error => {
          createNotification(
            `${personToDelete.name} was already deleted from the server`,
            'error'
          )
        })
      setPersons(persons.filter(p => p.id !== id))
    }
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
      <Notification 
        message={notification} 
        type={notificationType}
      />
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
        handleClick={deleteContact}
      />
    </div>
  )
}

export default App