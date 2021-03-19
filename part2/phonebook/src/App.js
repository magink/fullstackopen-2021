import React, { useState, useEffect } from "react";

import PhonebookList from "./components/PhonebookList";
import PersonForm from "./components/PersonForm";
import Search from "./components/Search";
import Notification from "./components/Notification";
import personsServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);
  const [warning, setWarning] = useState(false); // For selecting correct style in notification

  useEffect(() => {
    personsServices
      .getAllPersons()
      .then((personsData) => {
        setPersons(personsData);
      })
      .catch((error) => {
        setWarning(true);
        showNotification(
          `Unable to get persons from server, reason being ${error}`
        );
      });
  }, []);
  const addToPhonebook = (event) => {
    event.preventDefault();

    const newPersonObject = {
      name: newName.trim(),
      number: newNumber.trim(),
    };

    const addedPerson = persons.find(
      (p) => p.name.toLowerCase() === newPersonObject.name.toLowerCase()
    );

    if (addedPerson) {
      updatePerson(addedPerson, newPersonObject);
    } else {
      personsServices
        .createPerson(newPersonObject)
        .then((response) => {
          setPersons(persons.concat(response));
          showNotification(`${response.name} added to phonebook`);
        })
        .catch((error) => {
          setWarning(true);
          showNotification(`Unable to add person, reason being ${error}`);
        });
    }
  };

  const updatePerson = (person, newPersonObject) => {
    if (
      window.confirm(
        "Person is already added, replace old number with new number?"
      )
    ) {
      personsServices
        .updatePerson(person.id, newPersonObject)
        .then((response) => {
          setPersons(
            persons.map((person, newPersonObject) =>
              person.id !== response.id ? person : response
            )
          );
          showNotification(`${person.name} updated`);
        })
        .catch((error) => {
          setWarning(true);
          showNotification(`Unable to update person, reason being ${error}`);
        });
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
      setWarning(false);
    }, 15000);
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
      personsServices
        .deletePerson(person.id)
        .then((response) => {
          if (response.status === 200) {
            setPersons(persons.filter((p) => p.id !== person.id));
          }
        })
        .catch((error) => {
          setWarning(true);
          showNotification(`Unable to delete person, reason being ${error}}`);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && (
        <Notification message={notification} warning={warning} />
      )}

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
