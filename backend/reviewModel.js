import mongoose from "mongoose";

const Schema = mongoose.Schema
const reviews = new Schema({
    date: {
        type: String,
        required: true
    },

    rating: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

}, {timestamps: true})

export default mongoose.model('reviews',reviews)