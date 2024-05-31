const Button = ({ handleClick, type, text }) => {
  return (
    <button onClick={handleClick} type={type}>{text}</button>
  )
}

export default Button