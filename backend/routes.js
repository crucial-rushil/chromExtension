import express from "express";
import * as functions from './routeLogic.js';

//define all the routes to use in our application 
const router = express.Router();

// TODO: 1. Get all reviews for a house
router.get('/getReviews',functions.getReviews)

// 2. Submit a Review
router.post('/submitReview',functions.submitReview)

export default router