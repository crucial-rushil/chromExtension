import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewCard from './ReviewCard'; // Your ReviewCard component
import ReviewSummary from './ReviewSummary';
import { useCardContext } from './useCardContext';

const ReviewList = () => {

  const animalNames = [
    "Dog", "Cat", "Elephant", "Lion", "Tiger", "Rabbit", "Horse", "Cow", "Sheep", "Monkey",
    "Bear", "Deer", "Wolf", "Fox", "Kangaroo", "Panda", "Giraffe", "Zebra", "Leopard", "Cheetah",
    "Goat", "Pig", "Chicken", "Duck", "Turkey", "Goose", "Peacock", "Ostrich", "Penguin", "Swan",
    "Eagle", "Hawk", "Falcon", "Owl", "Parrot", "Pigeon", "Dove", "Sparrow", "Woodpecker", "Robin",
    "Frog", "Toad", "Salamander", "Newt", "Turtle", "Tortoise", "Crocodile", "Alligator", "Lizard", "Snake",
    "Shark", "Dolphin", "Whale", "Octopus", "Squid", "Crab", "Lobster", "Shrimp", "Jellyfish", "Starfish",
    "Beetle", "Butterfly", "Moth", "Bee", "Wasp", "Ant", "Termite", "Spider", "Scorpion", "Centipede",
    "Rat", "Mouse", "Hamster", "Gerbil", "Guinea Pig", "Chinchilla", "Ferret", "Bat", "Otter", "Beaver",
    "Seal", "Walrus", "Polar Bear", "Grizzly Bear", "Raccoon", "Skunk", "Porcupine", "Hedgehog", "Squirrel", "Chipmunk",
    "Camel", "Llama", "Alpaca", "Donkey", "Mule", "Yak", "Buffalo", "Bison", "Moose", "Reindeer"
  ];

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const {reviews, dispatch} = useCardContext()
  const [starData, setStarData] = useState([
    { percentage: 0 },
    { percentage: 0 },
    { percentage: 0 },
    { percentage: 0 },
    { percentage: 0 },
  ]); // State to hold starData
  const [average, setAverage] = useState(0)
  // Fetch reviews from the API when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getReviews');
        // setReviews(response.data);
        // console.log
        dispatch({type:'SET_CARDS', payload: response.data})
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
      
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      const starCount = [0, 0, 0, 0, 0];
      
      reviews.forEach((review) => {
        const rating = parseInt(review.rating, 10);
        starCount[5 - rating]++;
      });
      
      let sum = 0
      for (let i=0; i<starCount.length; i++)
        {
          sum += starCount[i]*[5-i]
        }
      sum = sum / reviews.length
      sum = Math.round(sum * 2) / 2;
      setAverage(sum)

      const calculatedStarData = starCount.map(count => ({
        percentage: Math.round((count / reviews.length) * 100)
      }));

      reviews.sort((a, b) => {
        // Convert the date strings to Date objects
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        
        // Sort in descending order (most recent first)
        return dateB - dateA; // Negative value if dateA is more recent, positive if dateB is more recent
      });

      reviews.forEach((review) => {
        const date = new Date(review.date);
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        const formattedDate = `${month} ${day}, ${year}`;
        review.date = formattedDate
      });
      
      setStarData(calculatedStarData); // Update starData with the correct structure
    }
  }, [reviews]); // Depend on reviews so starData is recalculated when reviews change

  useEffect(() => {
    console.log(reviews); // This will log the updated reviews array
  }, [reviews]); // Triggers when 'reviews' changes
  
  return (
    <div>
      <div>
      {starData && <ReviewSummary totalReviews={reviews.length} starData={starData} starAverage={average}/>}
      </div>
      <div>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewCard
              key={index}
              rating={review.rating}
              date={review.date}
              reviewText={review.description}
              name = {animalNames[Math.floor(Math.random() * 100)]}
            />
          ))
        ) : (
          <p>No reviews for this house exist be the first one to leave a review!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewList;

// import React, { useEffect } from 'react';
// import axios from 'axios';
// import ReviewCard from './ReviewCard'; // Your ReviewCard component
// import { useCardContext } from './useCardContext';

// const ReviewList = () => {
//   const { reviews, dispatch } = useCardContext();

//   // Fetch reviews from the API when the component mounts
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/getReviews');
//         dispatch({ type: 'SET_CARDS', payload: response.data });
//         console.log(reviews);
//       } catch (error) {
//         console.error('Error fetching reviews:', error);
//       }
//     };

//     fetchReviews();
//   }, [dispatch]);

//   return (
//     <div>
//       {reviews && reviews.length > 0 ? (
//         reviews.map((review, index) => (
//           <ReviewCard
//             key={index}
//             rating={review.rating}
//             date="Sept 23, 2024"
//             reviewText={review.description}
//           />
//         ))
//       ) : (
//         <p>No reviews available.</p>
//       )}
//     </div>
//   );
// };

// export default ReviewList;
