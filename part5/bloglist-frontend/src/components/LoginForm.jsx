import { useState } from 'react'
import PropTypes from 'prop-types'
import InputField from './InputField'
import Button from './Button'

const LoginForm = ({ handleLogin, handleRegister }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [loginMode, setLoginMode] = useState(true)

  const handleSubmit = async event => {
    event.preventDefault()
    if (loginMode) {
      await handleLogin(username, password)
    } else {
      await handleRegister(name, username, password, confirmPassword)
    }

    setName('')
    setUsername('')
    setPassword('')
    setConfirmPassword('')
  }

  const buttonLabel = loginMode
    ? 'Don\'t have an account? Click here to Register'
    : 'Already have an account? Click here to Login'

  const toggleMode = () => {
    setLoginMode(!loginMode)
  }

  return (
    <div className='login-form'>
      <h2>
        {loginMode ? 'Login to bloglist' : 'Create your account'}
      </h2>
      <form onSubmit={handleSubmit}>
        {!loginMode && (
          <InputField
            placeholder='Name'
            type='text'
            value={name}
            name='Name'
            id='name'
            dataTestId='name'
            handleChange={event => setName(event.target.value)}
            required
          />
        )}
        <InputField
          placeholder='Username'
          type='text'
          value={username}
          name='Username'
          autoComplete='off'
          id='username'
          dataTestId='username'
          handleChange={event => setUsername(event.target.value)}
          required
        />
        <InputField
          placeholder='Password'
          type='password'
          value={password}
          name='Password'
          id='password'
          dataTestId='password'
          handleChange={event => setPassword(event.target.value)}
          required
        />
        {!loginMode && (
          <InputField
            placeholder='Confirm Password'
            type='password'
            value={confirmPassword}
            name='confirmPassword'
            id='confirmPassword'
            dataTestId='confirmPassword'
            handleChange={event => setConfirmPassword(event.target.value)}
            required
          />
        )}
        <Button
          className='button button--green'
          label={loginMode ? 'Login' : 'Register'}
        />
      </form>
      <div>
        <p className='toggleText' onClick={toggleMode}>{buttonLabel}</p>
      </div>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm