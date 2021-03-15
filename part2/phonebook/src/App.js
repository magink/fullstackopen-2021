import React, { useState } from "react";
import PhonebookEntry from "./components/PhonebookEntry";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "+4672336123" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addToPhonebook = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      window.alert(`${newName} is already in the phonebook`);
      return;
    }
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(nameObject));
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addToPhonebook}>
        <div>
          name:{" "}
          <input
            onChange={handleNameChange}
            value={newName}
            required
            // pattern="" // Too demanding for now. Too many variations.
            placeholder="Hannu Mikkola" // RIP
          />
        </div>
        <div>
          number:{" "}
          <input
            type="tel"
            onChange={handleNumberChange}
            value={newNumber}
            required
            pattern="^[0-9 -]{0,16}$" // Max 16 numbers for now
            placeholder="358401234567"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <PhonebookEntry
          key={person.name}
          name={person.name}
          number={person.number}
        />
      ))}
    </div>
  );
};

export default App;
