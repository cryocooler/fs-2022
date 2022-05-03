import React, { useState } from 'react'

const Button = ({handleClick, text}) => (

  <button onClick = {handleClick}>{text}</button>
  )


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const copy = Array(anecdotes.length).fill(0)
  console.log(selected)
  console.log('current index', copy[selected])
  console.log(votes)

  const handleVote = () => {
      const voteCopy = [...votes]
      
        voteCopy[selected] += 1
        setVotes(voteCopy)
      }
    
    // anecdote with the largest vote: get element with maximum votes from voted
    const max = votes.reduce((x,y) => Math.max(x,y),votes[0])
    const maxIndex = votes.indexOf(max)

    console.log(maxIndex)
    console.log('max', max)


 
    return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br></br>
      has {votes[selected]} votes
      <br></br>
      <button onClick = {handleVote}>vote</button>
      <Button handleClick = {() => setSelected(Math.floor(Math.random()*anecdotes.length))} text = "next anecdote" />
      <h2>Anecdote with most votes</h2>
      {anecdotes[maxIndex]}
    </div>
  )
}

export default App