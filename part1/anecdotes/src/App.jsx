import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const initialVotes = Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)

  const findAnecdote = () => {
    const randNum = Math.floor(Math.random() * anecdotes.length)
    setSelected(randNum)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVoted = () => {
    let maxIndex = 0
    let maxValue = -1
    for (let i = 0; i < votes.length; i++) {
      console.log(votes[i])
      console.log(maxValue)
      if (votes[i] > maxValue) {
        maxIndex = i
        maxValue = votes[i]
      }
    }
    return maxIndex
  }

  const mostVotes = mostVoted()

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>Votes: {votes[selected]}</p>
        <button onClick={vote}>Vote</button>
        <button onClick={findAnecdote}>Get Random Anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[mostVotes]}</p>
        <p>Votes: {votes[mostVotes]}</p>
      </div>
    </div>
  )
}

export default App