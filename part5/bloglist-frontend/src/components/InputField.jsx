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
      />
    </div>
  )
}

export default InputField