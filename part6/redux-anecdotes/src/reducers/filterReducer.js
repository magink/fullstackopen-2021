
const filterReducer = (state = 'ALL', action) => {
  switch(action.type) {
    case 'SET_FILTER':
      return action.filter
    case 'REMOVE_FILTER': 
      return null
    default :
      return state
  }
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter
  }
}
export const removeFilter = () => {
  return {
    type: 'REMOVE_FILTER',
    notification: null
  }
}

export default filterReducer