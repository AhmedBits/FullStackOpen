import { useState } from 'react'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const clear = () => {
    setNewName('')
    setNewNumber('')
    setSearch('')
  }

  const addName = (event) => {
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

  const namesToShow = search === ''
    ? persons
    : persons.filter(person => 
      person.name.toLowerCase().includes(search.toLowerCase()))

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
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input 
          onChange={handleSearchChange}
          value={search}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            onChange={handleNameChange} 
            value={newName}
          />
        </div>
        <div>
          number: <input 
            onChange={handleNumberChange} 
            value={newNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {namesToShow.map(person => 
        <Persons key={person.name} person={person} />
      )}
    </div>
  )
}

export default App