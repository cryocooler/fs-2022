const Header = (props) => {
  return (
    
      <h1>{props.course}</h1>
    
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part name = {props.part.part1} exercises = {props.part.exercises1}/>
      <Part name = {props.part.part2} exercises = {props.part.exercises2}/>
      <Part name = {props.part.part3} exercises = {props.part.exercises3}/>
  
    </div>

  )

}

const Part = (props) => {

  return (
  
    <p>{props.name} {props.exercises}</p>
  )
}
 
const Total = (props) => {
  
  return (
    <p>number of exercises {props.exercises}</p>
  )
  
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course = {course} />
      <Content part = { {part1, exercises1, part2, exercises2, part3,exercises3} }  />
      <Total exercises ={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App