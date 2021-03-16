import React, { useState, useEffect } from "react";
import PhonebookList from "./components/PhonebookList";
import PersonForm from "./components/PersonForm";
import Search from "./components/Search";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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
      <Search search={search} handleSearch={handleSearch} />
      <PersonForm
        addToPhonebook={addToPhonebook}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <PhonebookList persons={persons} search={search} />
    </div>
  );
};

export default App;
