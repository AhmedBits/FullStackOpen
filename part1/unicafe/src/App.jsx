import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ( {handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Total = ({ text, amount }) => <p>{text} {amount} </p>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text='give feedback' />

      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />

      <Header text='statistics' />

      <Total text='good' amount={good} />
      <Total text='neutral' amount={neutral} />
      <Total text='bad' amount={bad} />
    </div>
  )
}

export default App
