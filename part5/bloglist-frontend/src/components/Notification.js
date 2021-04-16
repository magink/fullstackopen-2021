import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ text, warning }) => {
  const baseStyle = {
    backgroundColor: '#dcdcdc',
    borderRadius: '5px',
    fontSize: 16,
    fontWeight: 'bold',
    margin: '10px',
    padding: '10px',
  }
  const warningStyle = {
    color: 'red',
    border: 'solid red',
  }
  const notificationStyle = {
    color: 'green',
    border: 'solid green',
  }
  return(
    <div data-cy="notification"
      style={
        warning ? { ...baseStyle, ...warningStyle } : { ...baseStyle, ...notificationStyle }}>
      {text}
    </div>
  )
}

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  warning: PropTypes.bool.isRequired
}

export default Notification