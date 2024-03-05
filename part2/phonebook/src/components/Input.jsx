const Input = ({ text, handleChange, value }) => {
  return (
    <div>
      {text} <input 
        onChange={handleChange}
        value={value}
      />
    </div>
  )
}

export default Input