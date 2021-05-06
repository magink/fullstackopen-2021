import anecdoteService from '../services/anecdotes'


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': 
      const id = action.data.id
      const anecdoteToVote = state.find(n => n.id === id)
      const votedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      return state.map(anecdote => anecdote.id === id ? votedAnecdote : anecdote)
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_NOTES':
      return action.data
    default: 
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: anecdotes
    })
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}
export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
}

export default reducer