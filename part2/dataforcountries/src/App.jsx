import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const API_URL = 'https://studies.cs.helsinki.fi/restcountries/api/all';

export default function CountrySearch() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredCountries([]);
      return;
    }

    const results = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredCountries(results);
  }, [search, countries]);

  return (
    <div>
      <h1>Country Search</h1>
      <input
        type='text'
        placeholder='Search for a country...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredCountries.length > 10 ? (
        <p>Too many matches. Please be more specific.</p>
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>{country.name.common}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CountryDetails({ country }) {
  CountryDetails.propTypes = {
    country: PropTypes.shape({
      name: PropTypes.shape({
        common: PropTypes.string.isRequired,
      }).isRequired,
      capital: PropTypes.arrayOf(PropTypes.string),
      population: PropTypes.number.isRequired,
      languages: PropTypes.object,
      flags: PropTypes.shape({
        svg: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages || {}).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        width='150'
      />
    </div>
  );
}
