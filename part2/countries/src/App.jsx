import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Searchbar from './components/Searchbar'
import Display from './components/Display'

const App = () => {
  const [search, setSearch] = useState('')
  const [display, setDisplay] = useState('Begin searching...')
  const [allCountries, setAllCountries] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setAllCountries(response)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    searchForCountries(allCountries, event.target.value)
  }

  const searchForCountries = (allCountries, search) => {
    if (search == '') {
      return setDisplay('Begin searching...')
    }

    const matchingCountries = allCountries
      .map(country => country.name.common)
      .filter(name => name.toLowerCase().includes(search.toLowerCase()))

    const length = matchingCountries.length

    if (length > 10) setDisplay('Too many matches, specify another filter')
    else if (length > 1) setDisplay(matchingCountries)
    else if (length === 1) {
      countryService
        .searchedCountry(matchingCountries)
        .then(response => {
          setDisplay(response)
        })
    }
    else if (length === 0) setDisplay('No matches')
  }

  return (
    <div>
      <Searchbar
        text='find countries'
        handleChange={handleSearchChange}
        value={search}
      />
      <Display
        display={display}
      />
    </div>
  )
}

export default App