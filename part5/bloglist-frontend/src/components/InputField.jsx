const InputField = ({
  text,
  type,
  value,
  name,
  handleChange,
  id,
  placeholder
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
        placeholder={placeholder}
        required
        autoComplete='off'
      />
    </div>
  )
}

export default InputField