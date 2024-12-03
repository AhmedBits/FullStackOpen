import { useState } from "react"
import BlogForm from "./BlogForm"

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
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>close</button>
      </div>
    </div>
  )
}

export default Togglable