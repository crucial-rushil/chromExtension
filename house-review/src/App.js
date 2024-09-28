import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm';
import Toggle from './Toggle';
import TextField from '@mui/material/TextField';
import ReviewCard from './ReviewCard';
import ReviewList from './ReviewList.js'
import ReviewSummary from './ReviewSummary.js'

function App() {

  const [url, setUrl] = useState('');
  const [details, setDetails] = useState({
    address: {
      line: '',
      city: '',
      state_code: '',
      postal_code: ''
    },
    baths: '',
    sqft: '',
    bedrooms: ''
  });
  const [propID,isNull] = useState('')
  const [activeToggle, setActiveToggle] = useState('browse');

  const totalReviews = 8953;
  const starData = [
    { percentage: 72 },
    { percentage: 15 },
    { percentage: 7 },
    { percentage: 2 },
    { percentage: 3 },
  ];

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlSend = { url };
    try {
      const response = await fetch('http://localhost:4000/getDetails', {
        method: 'POST',
        body: JSON.stringify(urlSend),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();

      if (response.ok) {
        setDetails(json); // Update the state with fetched data
        isNull('true')
        console.log("INFO SENT");
        console.log(json);
      } else {
        console.error(json.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Reset form fields after submission if needed
    setUrl('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>welcome back Ava!</p>
        <form onSubmit={handleSubmit}>
          <TextField id="outlined-basic" label="insert house URL here" variant="outlined" onChange = {handleInputChange}/>
          <button type="submit">begin search</button>
        </form>
        
        <div>
          <p>the house selected:</p>
          <p>address: {details.address.line}, {details.address.city}, {details.address.state_code} {details.address.postal_code}</p>
          <p>bed: {details.bedrooms}</p>
          <p>bath: {details.baths}</p>
          <p>sq feet: {details.sqft}</p>
        </div>
        <Toggle active = {activeToggle} setActive= {setActiveToggle} />
        {activeToggle === 'write' && <ReviewForm/>}
        
        {propID === 'true' ? (
          <div>
            {activeToggle === 'browse' ? (
              <div>
                {/* <ReviewSummary totalReviews={totalReviews} starData={starData} /> */}
                <ReviewList />
              </div>
            ) : (
              <p>Toggle to browse to see the reviews.</p>
            )}
          </div>
        ) : (
          <p>Please search for a property first.</p>
        )}

      </header>
    </div>
  );
}

export default App;