import React, { useState, useImperativeHandle  } from 'react'
import PropTypes from 'prop-types'

const Toggleable = React.forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none': '' }
  const showWhenVisible = { display: visible ? '': 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility} >Cancel</button>
      </div>
    </div>
  )
})

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

Toggleable.displayName = 'Togglable'
export default Toggleable