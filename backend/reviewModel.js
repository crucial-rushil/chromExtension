import mongoose from "mongoose";

const Schema = mongoose.Schema
const reviews = new Schema({
    reviewRating: {
        type: String,
        required: true
    },

    reviewTitle: {
        type: String,
        required: true
    },

    reviewDescription: {
        type: String,
        required: true
    },

}, {timestamps: true})

export default mongoose.model('reviews',reviews)