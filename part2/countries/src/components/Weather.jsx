import { useState, useEffect } from 'react'
import countryService from '../services/countries'

const Weather = ({ capital, coordinates }) => {
  const [weather, setWeather] = useState(null)

  const [lat, lng] = coordinates
  const api_key = import.meta.env.VITE_SOME_KEY
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`

  useEffect(() => {
    countryService
      .getWeather(weatherUrl)
      .then(response => {
        setWeather(response)
      })
  }, [])

  if (weather === null) return null

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Weather: {weather.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
      <p>Temperature: {weather.main.temp}° Celcius</p>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather