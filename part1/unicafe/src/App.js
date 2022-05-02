import { useState } from 'react'

const Title = () => {
  return (
    <div>
      <h2>give feedback</h2>
    </div>
  )
}

const Button = ({onClick, text}) => (
  
  <button onClick = {onClick}>
    {text}
  </button>
)

const Statistics = ({states}) => {
  return (
    <div>
      <h2>statistics</h2>
      <p> good {states.good} </p>
      <p>neutral {states.neutral} </p>
      <p>bad {states.bad}</p>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title/>
      <Button onClick = { () => setGood(good+1)}
      text = 'good' />
      <Button onClick = {() => setNeutral(neutral+1)} 
      text = 'neutral' />
      <Button onClick = {() => setBad(bad+1)} 
      text = 'bad' />
      <Statistics states = {{good,neutral,bad}} />
    </div>
  )
}

export default App