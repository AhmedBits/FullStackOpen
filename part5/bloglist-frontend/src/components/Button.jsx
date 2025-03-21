const Button = ({ handleClick, label, className }) => {
  return (
    <button className={className} onClick={handleClick}>
      {label}
    </button>
  )
}

export default Button