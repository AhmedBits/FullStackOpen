import Message from "./Message"
import Countrylist from "./Countrylist"
import Countryinfo from "./Countryinfo"

const Display = ({ display }) => {
  if (display === null) return null

  if (Array.isArray(display)) {
    return (
      display.map((country, index) =>
        <Countrylist
          country={country}
          key={index}
        />
      )
    )
  }
  else if (typeof display === 'object') {
    return (
      <Countryinfo
        country={display}
      />
    )
  }
  else if (typeof display === 'string') {
    return (
      <Message
        message={display}
      />
    )
  }
}

export default Display