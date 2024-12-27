import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Togglable = forwardRef((props, refs) => {
  const [formVisible, setFormVisible] = useState(false)

  const showWhenVisible = { display: formVisible ? '' : 'none' }
  const hideWhenVisible = { display: formVisible ? 'none' : '' }

  const toggleVisibility = () => {
    setFormVisible(!formVisible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          handleClick={toggleVisibility}
          label={props.buttonLabel}
        />
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <Button
          handleClick={toggleVisibility}
          label='Close'
        />
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable