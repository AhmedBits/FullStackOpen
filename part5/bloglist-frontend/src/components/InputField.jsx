const InputField = ({
  text,
  type,
  value,
  name,
  handleChange,
  id,
  dataTestId,
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
        data-testid={dataTestId}
        required
        autoComplete='off'
        minLength={3}
      />
    </div>
  )
}

export default InputField