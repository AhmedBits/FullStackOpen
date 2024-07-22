const Button = ({ country, handleClick, text }) => {
  return (
    <button onClick={() => handleClick(country)}>
        {text}
    </button>
  )
}

export default Button