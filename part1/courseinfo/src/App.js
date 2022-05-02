const Header = ({course}) => {
  const {id, name, parts} = course
  console.log('header', name)
  return (
    
      <h1>{name}</h1>
    
  )
}

const Content = (course) => {
  const parts = course.parts.parts
  console.log('Content props', parts);
  return (
    <div>
      
      <Part part = {parts[0]}/>
      <Part part = {parts[1]}/>
      <Part part = {parts[2]}/>
     
  
    </div>

  )

}

const Part = ({part}) => {
  console.log('props passed to part', part);
  const {name, exercises} = part
  console.log(name)
 
  return (
    
    <p>{name} {exercises}</p>
  )
}
 
const Total = (course) => {
  const parts = course.parts.parts
  console.log('parts', parts)

  
  return (
    <p> total of {(parts.map(part => part.exercises)).reduce((x,y) => x +y, 0)} exercises</p>
  )
  
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }


  return (
    <div>
      <Header course = {course} />
      <Content parts = {course} />
      <Total parts = {course} />
    </div>
  )
}

export default App