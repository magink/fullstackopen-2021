import React from 'react'

const Notification = ({text, warning}) => {
  const baseStyle = {
    backgroundColor: "#dcdcdc",
    borderRadius: "5px",
    fontSize: 16,
    fontWeight: `bold`,
    margin: `10px`,
    padding: `10px`,
  };
  const warningStyle = {
    color: "red",
    border: "solid red",
  };
  const notificationStyle = {
    color: "green",
    border: "solid green",
  };
  return(
    <div 
    style={
      warning ? {...baseStyle, ...warningStyle} : { ...baseStyle, ...notificationStyle}}>
      {text}
    </div>
  )
}

export default Notification