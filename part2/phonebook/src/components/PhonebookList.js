import React from "react";
import Person from "./Person";

const PhonebookList = ({ persons, search }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((filteredPerson) => (
          <Person
            key={filteredPerson.name}
            name={filteredPerson.name}
            number={filteredPerson.number}
          />
        ))}
    </>
  );
};

export default PhonebookList;
