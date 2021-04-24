import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const sort = (anecdotes) => {
  return [...anecdotes].sort((anecdote, next) => next.votes - anecdote.votes)
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === 'ALL') {
      return sort(state.anecdotes)
    }
    const filteredAnecdotes = state.anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().indexOf(state.filter.toLowerCase()) !== -1)
    return sort(filteredAnecdotes)
  })
  const dispatch = useDispatch()

  const voteAnecdote = ({id, content}) => {
    dispatch(vote(id))
    dispatch(setNotification(`"${content}" upvoted!`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList