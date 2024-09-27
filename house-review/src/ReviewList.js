import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewCard from './ReviewCard'; // Your ReviewCard component
import { useCardContext } from './useCardContext';

const ReviewList = () => {
  // const [reviews, setReviews] = useState([]);
  const {reviews, dispatch} = useCardContext()
  const [propertyID,isNull] = useState('')

  // Fetch reviews from the API when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getReviews');
        // setReviews(response.data);
        // console.log
        dispatch({type:'SET_CARDS', payload: response.data})
        console.log(reviews)
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    console.log(reviews); // This will log the updated reviews array
  }, [reviews]); // Triggers when 'reviews' changes
  
  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <ReviewCard
            key={index}
            rating={review.rating}
            date='Sept 23, 2024'
            reviewText={review.description}
          />
        ))
      ) : (
        <p>No reviews for this house exist be the first one to leave a review!</p>
      )}
    </div>
    // <div>
    //   {reviews.map((review, index) => (
    //     <ReviewCard
    //       key={index}
    //       rating={review.rating}
    //       date='Sept 23, 2024'
    //       reviewText={review.description}
    //     />
    //   ))}
    // </div>
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
