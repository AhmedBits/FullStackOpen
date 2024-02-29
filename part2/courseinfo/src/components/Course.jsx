const Course = ({ courses }) => {
  return (
    <>
      {courses.map(course => 
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )}
    </>
  )
}

const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      <Part key={part.id} part={part} />
    )} 
  </>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Total = ({ parts }) => {
  const total = parts.reduce((sum, current) => 
    current.exercises + sum, 0
  )

  return (
    <p>Number of exercises {total}</p>
  )
}

export default Course