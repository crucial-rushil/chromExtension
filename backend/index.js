import express from "express"
import mongoose from "mongoose";
import workoutRoutes from './routes/workouts.js';
import bodyParser from 'body-parser';
import cors from 'cors';
//express App
const app = express()

// middleware
app.use(express.json())
app.use(cors());

app.use((req, res, next)=> {
    console.log(req.path, req.method)
    next()
})

app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

//react to requests
app.use('/api/workouts',workoutRoutes)

//connect to mongoDB
mongoose.connect("mongodb+srv://rushilshah2016:Pineapple424$@chromextensions.dgjlaip.mongodb.net/?retryWrites=true&w=majority&appName=chromExtensions")
    .then(()=> {
        //listen from requesets
        app.listen(4000, ()=>{
            console.log("listening on port 4000!!")
        })
    })
    .catch((error)=>{
        console.log(error)
    })