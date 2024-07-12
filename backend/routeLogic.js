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
const getReviews = async(req, res) => {

    try{
        const everyone = await reviews.find({}).sort({createdAt: -1}) //sort by descending order
        res.status(200).json(everyone) //gives us user documents in an array
    }
    catch (error)
    {
        res.status(400).json(req.body)
    }
}

export {submitReview, getReviews}