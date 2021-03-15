import React, { useState } from "react";
import PhonebookEntry from "./components/PhonebookEntry";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const addToPhonebook = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      window.alert(`${newName} is already in the phonebook`);
      return;
    }
    const nameObject = {
      name: newName,
    };
    setPersons(persons.concat(nameObject));
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addToPhonebook}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <PhonebookEntry key={person.name} name={person.name} />
      ))}
    </div>
  );
};

export default App;
