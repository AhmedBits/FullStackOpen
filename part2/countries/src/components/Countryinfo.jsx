const Countryinfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang, index) => 
          <li key={index}>{lang}</li>
        )}
      </ul>
      <img 
        src={country.flags.png}
        alt={country.flags.alt}
      />
    </div>
  )
}

export default Countryinfo