import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Notifier from "./components/Notifier";
import ErrorNotif from "./components/ErrorNotif";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [success, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    //console.log("effect");
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    event.preventDefault();
    setNewFilter(event.target.value);
  };

  const removePerson = (id) => {
    console.log(
      "person id",
      persons.filter((person) => person.id === id)[0].name
    );
    if (
      window.confirm(
        `Delete  ${persons.filter((person) => person.id === id)[0].name} ?`
      )
    )
      personService
        .remove(id)
        .then((response) => {
          console.log(response);
          setSuccessMessage(
            `Removed ${persons.filter((person) => person.id === id)[0].name}`
          );
          setTimeout(() => {
            setSuccessMessage(null);
          }, 2000);
          setNewName("");
          setNewNumber("");
          setNewFilter("");
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(
            `${
              persons.filter((person) => person.id === id)[0].name
            } was already removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 2000);
          setNewName("");
          setNewNumber("");
          setNewFilter("");
        });
  };

  const addPerson = (event) => {
    let errorCaught = false;
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (persons.map((p) => p.name).includes(newName)) {
      window.confirm(
        `${newName} is already added to phonebook, do you want to replace the number with a new one?`
      );
      const updatedPerson = persons.find((p) => p.name === newName);
      const changedNumber = { ...updatedPerson, number: newNumber };

      personService
        .update(updatedPerson.id, changedNumber)
        .then((response) => {
          setPersons(
            persons.map((p) => (p.id !== updatedPerson.id ? p : response))
          );
          setSuccessMessage(`Changed number for ${updatedPerson.name}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 2000);
          setNewName("");
          setNewNumber("");
          setNewFilter("");
        })
        .catch((error) => {
          console.log("errors");

          setErrorMessage(`${error.response.data.error}`);
          setTimeout(() => {
            setErrorMessage(null);
            setNewName("");
            setNewNumber("");
            setNewFilter("");
          }, 3000);
        });
    } else {
      personService
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response));
          setNewName("");
          setNewNumber("");
          setSuccessMessage(`Added ${newName}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 2000);
        })
        .catch((error) => {
          setErrorMessage(`${error.response.data.error}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);

          //console.log("ada", error.name);
          //console.log(error.response.data.error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notifier message={success} />
      <ErrorNotif message={errorMessage} />
      <Filter filterHandler={handleFilterChange} />

      <br></br>
      <h3>Add a new</h3>
      <PersonForm
        formTrigger={addPerson}
        inputName={newName}
        inputNumber={newNumber}
        personChange={handleNameChange}
        numberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        appliedFilter={newFilter}
        removeHandler={removePerson}
      />
    </div>
  );
};

export default App;
