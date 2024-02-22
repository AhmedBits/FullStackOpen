import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ scores, ...props }) => {
  if (props.sum === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <StatisticLine text='good' value={scores[0]} />
      <StatisticLine text='neutral' value={scores[1]} />
      <StatisticLine text='bad' value={scores[2]} />

      <StatisticLine text='sum' value={props.sum} />
      <StatisticLine text='average' value={props.average} />
      <StatisticLine text='positive' value={props.positive} />
    </table>
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
