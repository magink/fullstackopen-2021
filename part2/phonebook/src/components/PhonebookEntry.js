import React from "react";

const PhonebookEntry = ({ name, number }) => {
  return (
    <p>
      {name} {number}
    </p>
  );
};

export default PhonebookEntry;
