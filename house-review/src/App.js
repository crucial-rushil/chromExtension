import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [details, setDetails] = useState({ bedrooms: '', bathrooms: '' });

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const fetchHouseDetails = async () => {
    try {
      // Use CORS proxy or your backend to fetch data
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const { data } = await axios.get(proxyUrl + url);
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');

      // Update selectors to match Redfin's webpage structure
      const bedrooms = doc.querySelector('.statsValue').textContent.split(' ')[0];
      const bathrooms = doc.querySelector('.statsValue').nextElementSibling.textContent.split(' ')[0];

      setDetails({ bedrooms, bathrooms });
    } 
    catch (error) {
      console.error('Cannot get house details:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchHouseDetails();
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          welcome back Ava!
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={handleInputChange}
            placeholder="insert house URL here"
          />
          <button type="submit">begin search</button>
        </form>
        <div>
          <h2>house details</h2>
          <p>bedrooms: {details.bedrooms}</p>
          <p>bathrooms: {details.bathrooms}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
