import React, { useState } from 'react';

const ReviewForm = () => {
  const [date, setDate] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send data to backend
    console.log({ date, rating, description });
    // Reset form fields after submission if needed
    setDate('');
    setRating('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Rating:</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          required
        />
      </div>
      <button type="submit">Submit Review</button>
    </form>
    // <p>DISLAY SOME TEXT</p>
  );
};

export default ReviewForm;
