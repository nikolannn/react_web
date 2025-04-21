import React, { useEffect, useState } from 'react';
import CountryDetails from '../components/CountryDetails';
import '../App.css';

const Home = () => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch('https://countries-api-abhishek.vercel.app/')
      .then(res => res.json())
      .then(data => {
        const afghanistan = data.find(
          (c) => c.name.common === 'Afghanistan'
        );
        setCountry(afghanistan);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      {country ? <CountryDetails country={country} /> : <p>Loading...</p>}
    </div>
  );
};

export default Home;