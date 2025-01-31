const Persons = ({ filteredUsers, persons }) => {
  return (
    <div>
      <ul>
        {filteredUsers.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}

        {persons.map((person, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: '5px' }}>
            <li>
              {person.name} {person.phone}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Persons;
