import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm';
import Toggle from './Toggle';
// import TextField from '@mui/material/TextField';
import ReviewCard from './ReviewCard';
import ReviewList from './ReviewList.js'
import ReviewSummary from './ReviewSummary.js'
import { TextField, Button } from '@mui/material';

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
        <p>House Reviewer 🏠</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <TextField 
            id="outlined-basic" 
            label="insert house URL here" 
            variant="outlined" 
            onChange={handleInputChange} 
            fullWidth
            size="small"
            style={{ maxWidth: '400px' }}
          />
          {/* <button type="submit" variant="contained" color="white" style={{ height: '40px', minWidth: '100px' }}> Begin Search</button> */}
          <Button 
          type="submit" 
          variant="contained" 
          style={{ 
            backgroundColor: '#6d4ad6',  // Blue color for the button
            color: 'white',              // White text color
            height: '40px',              // Button height
            minWidth: '100px',           // Minimum button width
            borderRadius: '5px',         // Rounded corners
            textTransform: 'none',
            whiteSpace: 'nowrap',
          }}
           >
          Begin Search
          </Button>
        </form>
  
        {/* Box with house details */}
        {details && details.address ? (
          <div style={{ 
            backgroundColor: "#fbd085", 
            padding: "10px 20px 20px", 
            borderRadius: "10px", 
            fontSize: "14px", 
            fontWeight: "normal", 
            margin: "20px 0",  /* Adds margin to the top and bottom */
            width: "320px"
          }}>
            <p style={{ fontWeight: "bold",marginTop: "5px", marginBottom: "10px" }}>Selected House Details</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {/* Left column for bedrooms and bathrooms */}
              <div style={{ marginRight: "10px" }}>
                {details.bedrooms && <p>{details.bedrooms} bedroom</p>}
                {details.baths && <p>{details.baths} bathroom</p>}
              </div>
              {/* Right column for address */}
              <div>
                <p>{details.address.line}</p>
                <p>{details.address.city}, {details.address.state_code} {details.address.postal_code}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>No house selected yet</p>
        )}
  
        {/* Toggle functionality */}
        <Toggle active={activeToggle} setActive={setActiveToggle} />
        {activeToggle === 'write' && <ReviewForm />}
  
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