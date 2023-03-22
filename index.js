//APP entry point
const express = require('express');                                 //import express
const app = express();                                              //initializing express              
const bodyparser = require('body-parser');   
const db  = require('./dataBase/db');
const carRouter = require('./routes/cars');                         //connecting/importing to the cars route
const ownerRouter = require('./routes/owners');                     //connecting to the owners route
const employeeRouter = require('./routes/employees');               //connecting to the employees route
const owners =  require ('./models/owners');                         //initializing 
// const bcrypt = require('bcrypt');                                   //importing bcrypt
const port = process.env.PORT;                                      //define your port

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.static('public'));
app.use(express.json());
app.use(bodyparser.json());

db.connectToMongoDB();                    //connect to MongoDB

app.use('/cars', carRouter);                                        //using cars router
app.use('/owners', ownerRouter);                                    //using owners router
app.use('/employees', employeeRouter);  
//Homepage
app.get("/", (req, res) =>{
    res.render('index');
});
//Login page
app.get("/login", (req, res) =>{
    res.render('login');
});
//Signup
app.get("/signup", (req, res) =>{
    res.render('signup');
});
// //Cars
// app.get("/cars", (req, res) =>{
//     res.render('cars');
// });
        
                                  //using employees router


app.listen(port, () => {
    console.log(`carLot is running on http://localhost:${port}`)
});















//Hashing password
    /*OwnersSchema.pre('save', function(next) {
        if(this.password) {
            const salt = bcrypt.genSaltSync(10)
            this.password = bcrypt.hashSync(this.password, salt)
            }
            next()
        })*/