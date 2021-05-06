const initialState = null 

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
        return null
    default: 
      return state
  }
}
export const setNotification = (notification, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeout)
  }
}
export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    notification: null
  }
}
export default notificationReducer