import React from "react";

const Notification = ({ message, warning }) => {
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
  if (message === null) {
    return null;
  }
  return (
    <div
      style={
        warning
          ? { ...baseStyle, ...warningStyle } // Spread syntax allows merging of my two style objects.
          : { ...baseStyle, ...notificationStyle }
      }
    >
      {message}
    </div>
  );
};
export default Notification;
