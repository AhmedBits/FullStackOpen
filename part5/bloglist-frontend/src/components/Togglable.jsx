import { useState } from "react"
import Button from "./Button"

const Togglable = (props) => {
  const [formVisible, setFormVisible] = useState(false)

  const showWhenVisible = { display: formVisible ? '' : 'none' }
  const hideWhenVisible = { display: formVisible ? 'none' : '' }

  const toggleVisibility = () => {
    setFormVisible(!formVisible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          handleClick={toggleVisibility}
          label={props.buttonLabel}
        />
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          handleClick={toggleVisibility}
          label='close'
        />
      </div>
    </div>
  )
}

export default Togglable