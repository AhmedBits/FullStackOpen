import Input from "./Input"
import Button from "./Button"

const PersonForm = ({ handleSubmit, inputHandlers, states }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Input 
        text='name: '
        handleChange={inputHandlers.handleNameChange}
        value={states.newName}
      />
      <Input 
        text='number: '
        handleChange={inputHandlers.handleNumberChange}
        value={states.newNumber}
      />
      <Button 
        type='submit'
        text='add'
      />
    </form>
  )
}

export default PersonForm