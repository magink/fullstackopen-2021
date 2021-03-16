import React, { useState } from "react";
import PhonebookEntry from "./components/PhonebookEntry";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

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
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <input
        onChange={handleSearch}
        type="search"
        placeholder="Search.."
        value={search}
      />
      <h2>Add new</h2>
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
            pattern="^[0-9 -]{0,16}$" // Max 16 numbers for now, no +
            placeholder="358401234567"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((filteredPerson) => (
          <PhonebookEntry
            key={filteredPerson.name}
            name={filteredPerson.name}
            number={filteredPerson.number}
          />
        ))}
    </div>
  );
};

export default App;
