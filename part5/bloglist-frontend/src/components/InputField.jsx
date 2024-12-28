const InputField = ({
  text,
  type,
  value,
  name,
  handleChange,
  id
}) => {
  return (
    <div>
      {text}
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        id={id}
        required
        autoComplete='off'
      />
    </div>
  )
}

export default InputField