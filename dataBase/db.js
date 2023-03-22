
const mongoose = require('mongoose');                //Import mongoose and the 
require('dotenv').config();                         //import dotenv module
const MONGODB_URI = process.env.MONGODB_URI;      //Load the MongooseDB URI from the environment variables

function connectToMongoDB() {                   //Function to connect to MongoDB
mongoose.connect(MONGODB_URI);

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB successfully');
    });

    mongoose.connection.on('error', (err) => {
        console.log('Error connecting to MongoDB', err);
     })

};
   
module.exports = {connectToMongoDB}             //Export the connectToMongoDB function
































 /*mongoose.connection.close(() =>{
        console.log("mongoDB connection closed")
    })*/






















   /* //Log an error message if the connection failed
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
})*/