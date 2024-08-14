const Input = ({ text, handleChange, value }) => {
  return (
    <div>
      {text} <input 
        onChange={handleChange}
        value={value}
        name='input'
      />
    </div>
  )
}

export default Input