

const Course = ({ course }) => {
  const {id, name, parts} = course
  return (
    <div>
      <Header name = {name} />
      <Content parts = {parts} />
    </div>
  )
}

const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part key = {part.id}
        part = {part} />
          )}
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'State of mind',
        exercises: 15,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}


export default App