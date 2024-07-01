import express from "express"
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

//Load and Define Sensitive Information from Environment Variables
dotenv.config();

//make an express App
const app = express()

//specify port number
const port = process.env.PORT 

//NOTE: we should eventually keep only one of the formats to PARSE requests and send all requests in that format
//automatically PARSE all requests sent in JSON Format
app.use(express.json())

//automatically PARSE all requests sent in url encoded Format
app.use(bodyParser.urlencoded({ extended: false }));

//utilize third paty package to parse requests
app.use(bodyParser.json());

//MASSIVE SECURITY VULERNABILITY (CHANGE LATER TO CHROME EXTENSION ID) OK FOR LOCAL DEV PURPOSES
//currently anyone can send requests to our backend
app.use(cors());

app.use((req, res, next)=> {
    console.log(req.path, req.method)
    next() //pass control to next middleware function
})

app.get('/', (req, res) => {
    res.send('Welcome to the backend.');
});
var connection_string = process.env.DB_CONNECTION
mongoose.connect(connection_string)
    .then(()=> {
        //listen from requesets
        app.listen(port, ()=>{
            console.log("listening on port 4000!!")
        })
    })
    .catch((error)=>{
        console.log(error)
    })

