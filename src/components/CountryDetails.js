import React from 'react';
import '../App.css';

const CountryDetails = ({ country }) => {
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold">{country.name.common}</h2>
      <p className="mt-2"><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Subregion:</strong> {country.subregion}</p>
      <p><strong>Population:</strong> {country.population}</p>
      <p><strong>Area:</strong> {country.area} km²</p>
      <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
      <p><strong>Currency:</strong> {country.currencies ? country.currencies[Object.keys(country.currencies)[0]].name : 'N/A'}</p>
    </div>
  );
};

export default CountryDetails;