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
  const {good, neutral, bad} = states
  const mean = (good + bad) / (good + bad + neutral)
  const pctGood = good / (good + bad + neutral) 
  if (!good && !bad && !neutral) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } else {
  return (
    <div>
       <h2>statistics</h2>
      <table>
        <td>
          <StatisticsLine text = 'good' stat = {good} />
          <StatisticsLine text = 'neutral' stat = {neutral} />
          <StatisticsLine text =  'bad' stat = {bad}/>
          <StatisticsLine text = 'average' stat ={mean} />
          <StatisticsLine text = 'positive' stat = {pctGood* 100 + '%'} />
       </td>
      </table>
      
   
    </div>
  )
  }
}

const StatisticsLine = ({text, stat}) => {

  return (
      <tr>
        <td>{text}</td>
        <td>{stat}</td> 
        </tr>
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
      <Statistics states = {{good, neutral, bad}}  />
    </div>
  )
}

export default App