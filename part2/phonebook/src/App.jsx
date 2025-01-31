import axios from 'axios';
import { useEffect, useState } from 'react';
import apiService from '../apiService';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(persons);
  const [addNotification, setAddNotification] = useState(null);
  const [deleteNotification, setDeleteNotification] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  useEffect(() => {
    setFilteredUsers(persons);
  }, [persons]);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };

      apiService.create(newPerson).then((returnedPerson) => {
        setPersons([...persons, returnedPerson]); // Update state with the new person from the server
      });

      setAddNotification(`Added ${newPerson.name} successfully!`);
      setTimeout(() => {
        setAddNotification(null);
      }, 5000);

      setNewName('');
      setNewNumber('');
    }
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = persons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      apiService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setFilteredUsers(filteredUsers.filter((person) => person.id !== id));
          setDeleteNotification(`Deleted ${name} successfully!`);
          setTimeout(() => {
            setDeleteNotification(null);
          }, 5000);
        })
        .catch((error) => {
          alert(
            `${error} Failed to delete ${name}. It may have already been removed from the server.`
          );
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      {addNotification && (
        <div className='add-notification'>{addNotification}</div>
      )}
      {deleteNotification && (
        <div className='delete-notification'>{deleteNotification}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Filter</h2>
          <Filter
            searchItem={searchItem}
            handleInputChange={handleInputChange}
          />
        </div>
        <div>
          <h2>Add a new person</h2>
          <PersonForm
            newName={newName}
            handleNameChange={handleNameChange}
            newNumber={newNumber}
            handleNumberChange={handleNumberChange}
          />
        </div>
      </form>
      <h2>Phone numbers</h2>
      <Persons filteredUsers={filteredUsers} deletePerson={deletePerson} />
    </div>
  );
};

export default App;

const Filter = ({ searchItem, handleInputChange }) => {
  return (
    <div>
      Filter:{' '}
      <input
        type='text'
        value={searchItem}
        onChange={handleInputChange}
        placeholder='Search...'
      />
    </div>
  );
};

const PersonForm = ({
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <div>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Phone Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type='submit' id='add-button'>
          Add
        </button>
      </div>
    </div>
  );
};

const Persons = ({ filteredUsers, deletePerson }) => {
  return (
    <div>
      <ul>
        {filteredUsers.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}{' '}
            <button onClick={() => deletePerson(person.id, person.name)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
