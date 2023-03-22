const ownerModel = require('../models/owners');


//Signup function.................................................................
const signup  = async (req, res) => {
    try {
        const { email, password, username, phone } = req.body;
        //Check if the user already exists
        const existingUser = await URLSearchParams.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }
        //Create new user with username field
        const user = new Users({ email, password, username, phone });
        await user.save();
        //Generate JWT
        const token = jwt.sign({ userId: user._id}, process.evn.JWT_SECTRET);
        res.status(201).json({ user, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error'})
    }
};

//Login function.........................................................................
const login = async (req, res, next) => {
    passport.authentication('local', {session: false}, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if(!user) {
            return res.status(401).json({message: 'Invalid credentials'});
        }
        //Generate JWT
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECTRET);
        res.json({user, token});
    }) (req, res, next);
};



//Get function for all Owners.................................................................................
const getOwners  = (req,res)  => {
    //using the the 'ownerModel' to find all owners 
    ownerModel.find()                

    .then(owners  => {
        //if query is successful, return JSON array of the owners               
        res.json(owners)
    })
    .catch(err  => { 
        //if an error occurs, log the error msg. and send the error to the client               
        console.log(err)
        res.send(err)
    })
}

//Post Owner.....................................................................................
const postOwner = (req,res) => {
    const owner = req.body           //extract the book object from the request body
    owner.createeAt = new Date()  //set the lastUpdateAt property of the book to the current date
    ownerModel.create(owner)          //create a new book in the database using the bookModel

    .then(user => {
        res.status(201).json(user)  //if the book is successfully created, return a 201 status code.
    })
    .catch(err => {
        console.log(err)            //if there is error, log it to the console and return a 500 status code.
        res.status(500).json(err)
    })
}

//Get owner by ID..............................................................................
const getOwnerById = (req,res)  => {
    const id = req.params.id        //get the Id from the URL parameters
    ownerModel.findById(id)          //use the bookModel to find a book by its Id
    .then(owner  => {
        res.status(200).json(user)
    })
    .catch(err => {                 //if there's error, log it and return an error msg.
        console.log(err)
        res.status(404).send(err)
    })
}

//Delete owner by ID.................................................................................
const deleteOwnerById = (req,res)  => {
    const id = req.params.id                //get the id of the book to delete from the request parameters
    ownerModel.findByIdAndRemove(id)         //use the findByIdAndRemove method on the bookModel to delete the book.
    .then(owner => {
        res.status(200).json("Owner deleted successfully!")      //if the book is deleted successfully,send the deleted book back to the client.
    })
    .catch(err => {
        console.log(err)                    //if there is an error, log it an send a 500 Internal Servsr Error.
        res.status(500).json(err)
    })
}

//Update owner by ID..................................................................................
const updateOwnerById = (req,res) => {
    const id = req.params.id                //get the id from the URL parameters
    const Owner = req.body                   //get the updated book data from the request body
    owner.lastUpdateAt = new Date()          //set the lastUpdateAt to the current date
    userModel.findByIdAndUpdate(id, owner, {new: true})      //use the Mongoose findByIdAndUpdate method to update the book in the db.
    .then(owner =>{
        res.status(200).json("Updated successfully!")       //if the update is successful, return the updated book in the response
    })
    .catch(err =>{
        console.log(err)
        res.send(500).json(err)
    })
}

//Exporting my module
module.exports = {
    getOwners,
    getOwnerById,
    signup,
    login,
    postOwner,
    deleteOwnerById,
    updateOwnerById
}