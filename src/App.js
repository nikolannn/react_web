// App.js
import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import './App.css';

import CountryDetails from './components/CountryDetails';
import Flag from './components/Flag';
import Borders from './components/Borders';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const [country, setCountry] = useState(null);
  const [search, setSearch] = useState('Afghanistan'); // Default search term
  const [error, setError] = useState(null); // To track errors
  const [suggestions, setSuggestions] = useState([]); // To store country suggestions

  // Function to fetch country data
  const fetchCountryData = useCallback((searchTerm) => {
    fetch(`https://restcountries.com/v3.1/name/${searchTerm}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Country not found');
        }
        return response.json();
      })
      .then((data) => {
        const countryData = data.find(
          (c) => c.name.common.toLowerCase() === searchTerm.toLowerCase()
        );
        if (countryData) {
          setCountry(countryData);
          setError(null);
        } else {
          setCountry(null);
          setError('Country not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching country data:', error);
        setCountry(null);
        setError('Error fetching country data');
      });
  }, []);

  // Function to fetch country suggestions
  const fetchCountrySuggestions = (searchTerm) => {
    fetch(`https://restcountries.com/v3.1/name/${searchTerm}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching suggestions');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setSuggestions(data);
        } else {
          setSuggestions([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching country suggestions:', error);
        setSuggestions([]);
      });
  };

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      fetchCountryData(searchTerm);
      fetchCountrySuggestions(searchTerm);
    }, 500),
    [fetchCountryData, fetchCountrySuggestions]
  );

  // Handler for search input change
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    const capitalizedSearchTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase();
    setSearch(capitalizedSearchTerm);
    debouncedSearch(capitalizedSearchTerm);
  };

  // Fetch data on initial load and whenever search term changes
  useEffect(() => {
    fetchCountryData(search);
    fetchCountrySuggestions(search);
  }, [search, fetchCountryData]);


  return (
    <div className="font-sans">
  <Header />
  {/* Search Input */}
  <div className="relative w-full max-w-[800px] mt-8 mx-auto">
    <label htmlFor="country-search" className="sr-only">
      Search for a country
    </label>
    <input
      id="country-search"
      type="text"
      placeholder="Search for a country"
      value={search}
      onChange={handleSearchChange}
      className="search-input"
        />
        
      </div>

      {/* Show error if country not found */}
      {error && <div className="error-message">{error}</div>}

      {/* Country Data */}
      {country && (
        <div className="country-box">
          <Flag flagUrl={country.flags.svg} />
          <CountryDetails country={country} />
          <Borders borders={country.borders} setCountry={setCountry} setError={setError} />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
