import '../App.css';
import React, { useState, useEffect } from 'react';
// import './Borders.css'; // Uncomment if you have a CSS file for styling

const Borders = ({ borders, setCountry, setError }) => {
  // State to hold the list of border countries
  const [borderCountries, setBorderCountries] = useState([]);

  // Effect to fetch border countries' data when the borders prop changes
  useEffect(() => {
    const fetchBorderCountries = async () => {
      try {
        // Fetch data for each border country
        const countries = await Promise.all(
          borders.map(async (border) => {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
            const data = await response.json();
            return data[0]; // Return the first country data
          })
        );
        setBorderCountries(countries); // Update state with fetched countries
      } catch (error) {
        console.error("Error fetching border countries:", error);
        setError("Failed to fetch the border of the countries"); // Set error message
      }
    };

    // Only fetch if there are borders to process
    if (borders && borders.length > 0) {
      fetchBorderCountries();
    }
  }, [borders, setError]); // Dependencies for the effect

  // Function to handle click on a border country
  const handleBorderClick = async (countryCode) => {
    try {
      setCountry(null); // Clear current country before fetching new data
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      const data = await response.json();
      setCountry(data[0]); // Set the clicked border country data
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching clicked border country:", error);
      setError("Failed to fetch border country data"); // Set error message
    }
  };

  // Render the component
  return (
    <div className="borders mt-6 p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800">Border Countries:</h3>
      <ul className="list-disc ml-5 mt-4 space-y-3">
        {borderCountries.map((border) => (
          <li
            key={border.cca3} // Unique key for each list item
            className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors duration-200 ease-in-out transform hover:scale-105"
            onClick={() => handleBorderClick(border.cca3)} // Click handler
          >
            {border.name.common} {/* Display the name of the border country */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Borders; // Export the component for use in other parts of the application