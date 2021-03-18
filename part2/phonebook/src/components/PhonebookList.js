import React from "react";
import Person from "./Person";

const PhonebookList = ({ persons, search, handleDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((filteredPerson) => (
          <div key={filteredPerson.name}>
            <Person name={filteredPerson.name} number={filteredPerson.number} />
            <button onClick={() => handleDelete(filteredPerson)}>delete</button>
          </div>
        ))}
    </>
  );
};

export default PhonebookList;
