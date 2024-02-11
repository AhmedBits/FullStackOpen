const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p> {props.name} {props.exercises} </p>
    </>
  )
}

const Content = (props) => {
  const names = props.parts.map(name => name.name)
  const exercises = props.parts.map(exercise => exercise.exercises)

  return (
    <>
      <Part name={names[0]} exercises={exercises[0]} />
      <Part name={names[1]} exercises={exercises[1]} />
      <Part name={names[2]} exercises={exercises[2]} />
    </>
  )
}

const Total = (props) => {
  const totalExercises = props.parts.reduce((sum, current) => sum + current.exercises, 0)

  return (
    <>
      <p>Number of exercises {totalExercises}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
