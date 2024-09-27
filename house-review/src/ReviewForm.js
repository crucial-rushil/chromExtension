import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { useCardContext } from './useCardContext';

const ReviewForm = () => {
  const { dispatch } = useCardContext()
  const [date, setDate] = useState('');
  const [rating, setRating] = useState(2);
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send data to backend
    console.log({ date, rating, description });
    const review = { date, rating, description };
    const response = await fetch('http://localhost:4000/submitReview', {
      method: 'POST',
      body: JSON.stringify(review),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (response.ok) {
      alert("Review Added")
      console.log("Review Added");
      dispatch({type: 'CREATE_CARD',payload: json})
    } else {
      console.log(json.error);
      alert(json.error)
      console.log("ur mum gae")
    }
    
    // Reset form fields after submission if needed
    setDate('');
    setRating(5);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '1rem' }}>
        <h5 style={{ textAlign: 'left', marginBottom: '0.5rem' }}>date:</h5>
        <TextField
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <h5 style={{ textAlign: 'left', marginBottom: '0.5rem' }}>rating:</h5>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <h5 style={{ textAlign: 'left', marginBottom: '0.5rem' }}>description:</h5>
        <textarea
          name="review"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          style={{ width: '100%' }}
          required
        />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
