const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': 
      const id = action.data.id
      const anecdoteToVote = state.find(n => n.id === id)
      const votedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      return state.map(anecdote => anecdote.id === id ? votedAnecdote : anecdote)
    case 'NEW_ANECDOTE':
      const newAnecdote = asObject(action.data.anecdote)
      return state.concat(newAnecdote)
    case 'INIT_NOTES':
      return action.data
    default: 
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  console.log(anecdotes);
  return {
    type: 'INIT_NOTES',
    data: anecdotes
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}
export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: { anecdote }
  }
}

export default reducer