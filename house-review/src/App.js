import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import ReviewForm from './ReviewForm';
import Toggle from './Toggle';

function App() {
  const [url, setUrl] = useState('');
  const [details, setDetails] = useState({ bedrooms: '', bathrooms: '' });
  const [activeToggle, setActiveToggle] = useState('browse');

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlSend = { url };
    const response = await fetch('http://localhost:4000/getDetails', {
      method: 'POST',
      body: JSON.stringify(urlSend),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (response.ok) {
      alert(JSON.stringify(json, null, 2));
      console.log("INFO SENT");
      console.log(json)
    } else {
      console.log(json.error);
    }
    
    // Reset form fields after submission if needed
    setUrl('');
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
        <Toggle active = {activeToggle} setActive= {setActiveToggle} />
        {activeToggle === 'write' && <ReviewForm/>}
      </header>
    </div>
  );
}

export default App;