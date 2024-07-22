import Button from "./Button"

const Countrylist = ({ country, handleClick }) => {
  return (
    <div>
      {country}
      <Button
        country={country}
        handleClick={handleClick}
        text='show'
      />
    </div>
  )
}

export default Countrylist