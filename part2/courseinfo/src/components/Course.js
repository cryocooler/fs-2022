import React from 'react'

const Course = ({ course }) => {
    const {id, name, parts} = course
    return (
      <div>
        <Header name = {name} />
        <Content parts = {parts} />
        <Total parts = {parts} />
      </div>
    )
  }
  
  const Header = ({ name }) => <h1>{name}</h1>
  
  const Total = ({ parts }) => {
    console.log(parts);
    return (
      <div>
           <b>Total of {parts.map(part => part.exercises).reduce((x,y) => x+y, 0)} exercises </b>
      </div>
    )
  }
  
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


  export default Course