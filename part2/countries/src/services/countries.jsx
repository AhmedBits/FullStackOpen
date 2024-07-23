import axios from 'axios'
const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
  const request = axios.get(`${countryUrl}/all`)
  return request.then(response => response.data)
}

const searchedCountry = (country) => {
  const request = axios.get(`${countryUrl}/name/${country}`)
  return request.then(response => response.data)
}

const getWeather = (url) => {
  const request = axios.get(`${url}`)
  return request.then(response => response.data)
}

export default {
  getAll,
  searchedCountry,
  getWeather
}