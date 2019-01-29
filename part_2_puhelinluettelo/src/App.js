import React, { useState, useEffect } from "react";
import Details from "./component/Details";
import Title from "./component/Title";
import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import Header from "./component/Header";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [filteredList, setNewFilteredList] = useState(persons);

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
      setNewFilteredList(initialPersons);
    });
  }, []);

  const handleNameChange = event => setNewName(event.target.value);
  const handleNumberChange = event => setNewNumber(event.target.value);

  const handleFilterChange = event => {
    setNewFilter(event.target.value);
    setNewFilteredList(
      persons.filter(person =>
        person.name.toUpperCase().includes(event.target.value.toUpperCase())
      )
    );
  };

  const addPerson = event => {
    event.preventDefault();
    const name = newName;
    const number = newNumber;
    if (persons.map(person => person.name).includes(name)) {
      window.alert(`${name} on jo luettelossa.`);
    } else {
      const personObject = {
        name: name,
        number: number
      };
      personService.create(personObject).then(returnedPerson => {
        setNewFilteredList(persons.concat(returnedPerson));
      });
      setNewName("");
      setNewNumber("");
    }
  };

  const removePerson = ({ id, name }) => {
    if (window.confirm(`Are you sure you want to remove details for ${name}`)) {
      personService.remove(id).then(response => {
        console.log(response);
      });
    }
  };

  return (
    <div>
      <Title name="Puhelinluettelo" />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Header name="Lisää uusi nimi luetteloon" />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Header name="Numerot" />
      <Details persons={filteredList} removePerson={removePerson} />
    </div>
  );
};

export default App;