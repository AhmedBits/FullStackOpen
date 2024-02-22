import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Total = ({ text, amount }) => <p>{text} {amount}</p>

const Statistics = ({ scores, ...props }) => {
  if (props.sum === 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <Total text='good' amount={scores[0]} />
      <Total text='neutral' amount={scores[1]} />
      <Total text='bad' amount={scores[2]} />

      <Total text='sum' amount={props.sum} />
      <Total text='average' amount={props.average} />
      <Total text='positive' amount={props.positive} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const scores = [
    good,
    neutral,
    bad
  ]

  const sum = scores.reduce((sum, current) => sum + current, 0)
  const average = (good * 1) + (neutral * 0) + (bad * -1)
  const positive = good / sum

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

      <Statistics scores={scores} sum={sum} average={average / sum} positive={positive} />
    </div>
  )
}

export default App
