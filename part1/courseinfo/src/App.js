const Header = (props) => {
  return (
    
      <h1>{props.course}</h1>
    
  )
}

const Content = (props) => {
  console.log(props);
  return (
    <div>
      <Part part = {props.parts.part1}/>
      <Part part = {props.parts.part2}/>
      <Part part = {props.parts.part3}/>
     
  
    </div>

  )

}

const Part = (props) => {
  console.log('props passed to part');
  const name = props.part.name
  const exercises = props.part.exercises
  return (
    
    <p>{name} {exercises}</p>
  )
}
 
const Total = (parts) => {
  console.log('parts', parts)
  const exSum = parts.exercises.part1.exercises + parts.exercises.part2.exercises 
    + parts.exercises.part3.exercises
  
  return (
    <p>number of exercises {exSum} </p>
  )
  
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course = {course} />
      <Content parts = {{part1, part2, part3}} />
      <Total exercises = {{part1, part2, part3}} />
    </div>
  )
}

export default App