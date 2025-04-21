import React from 'react';
import '../App.css';

const Flag = ({ flagUrl }) => (
  <>
    {/* <style>
      {`
        .flag-img {
          width: 50rem;
          height: auto;
          margin-bottom: 1rem;
          border-radius: 0.25rem;
        }
      `}
    </style> */}
    <img src={flagUrl} alt="Flag" className="flag-img" />
  </>
);

export default Flag;