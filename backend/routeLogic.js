import mongoose from "mongoose";
import reviews from './reviewModel.js'


//Logic to post a review
const submitReview = async(req, res) =>{
    const {reviewTitle, reviewDescription, reviewRating} = req.body

    //add doc to db
    try {
        const review = await reviews.create({reviewTitle, reviewDescription, reviewRating})
        res.status(200).json(review)
    }
    catch (error)
    {
        res.status(400).json(req.body)
    }
}

//TODO: Logic to Get all Reviews


export {submitReview}