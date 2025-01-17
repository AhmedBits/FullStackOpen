import { useState } from 'react'
import PropTypes from 'prop-types'
import InputField from './InputField'
import Button from './Button'

const LoginForm = ({ handleLogin, buttonLabel }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    await handleLogin(username, password)

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          text='Username: '
          type="text"
          value={username}
          name='Username'
          autoComplete='off'
          id='username'
          handleChange={event => setUsername(event.target.value)}
          required
        />
        <InputField
          text='Password: '
          type='password'
          value={password}
          name='Password'
          id='password'
          handleChange={event => setPassword(event.target.value)}
          required
        />
        <Button
          label={buttonLabel}
        />
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired
}

export default LoginForm