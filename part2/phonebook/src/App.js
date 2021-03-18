import React, { useState, useEffect } from "react";

import PhonebookList from "./components/PhonebookList";
import PersonForm from "./components/PersonForm";
import Search from "./components/Search";
import personsServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personsServices.getAllPersons().then((personsData) => {
      setPersons(personsData);
    });
  }, []);

  const addToPhonebook = (event) => {
    event.preventDefault();
    const newPersonObject = {
      name: newName,
      number: newNumber,
    };
    personsServices
      .createPerson(newPersonObject)
      .then((response) => setPersons(persons.concat(response)));
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
  const handleDelete = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personsServices.deletePerson(person.id).then((response) => {
        if (response.status === 200) {
          setPersons(persons.filter((p) => p.id !== person.id));
        }
      });
    }
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
      <PhonebookList
        persons={persons}
        search={search}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
