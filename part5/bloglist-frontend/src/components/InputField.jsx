const InputField = ({
  text,
  type,
  value,
  name,
  handleChange
}) => {
  return (
    <div>
      {text}
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        required
        autoComplete="off"
      />
    </div>
  )
}

export default InputField