const Countryinfo = ({ country }) => {
  return (
    <pre>
      {JSON.stringify(country, null, 2)}
    </pre>
  )
}

export default Countryinfo