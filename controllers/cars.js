//Importing
const carModel = require('../models/cars');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');

//Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

//Unix timestamp in seconds
const timestamp = Math.floor(Date.now() / 1000);

//Configure multer to use Cloudinary
const location = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Cars'
    }
})

const upload = multer({storage: location});


//GET Cars.................................................................................
const getCars  = (req,res)  => { 
    carModel.find()                //using the the 'BookModel' to find all books

    .then(cars  => {               //if query is successful, return JSON array of the books
        // res.json(cars)
        res.render('cars', {cars});
    })
    .catch(err  => {                //if an error occurs, log the error msg. and send the error to the client
        console.log(err)
        res.send(err)
    })
}

//POST USERs.....................................................................................
const postCar = async(req, res) => {
    try {
        //Upload img to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            timestamp: timestamp,
        })
        //Save room MongoDB with Cloudinary URL
        const car = await carModel.create({
            ...req.body,
            imgUrl: result.secure_url
        });

        res.status(201).json(room);

    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
};
    // const car = req.body           //extract the book object from the request body
    // car.createeAt = new Date()  //set the lastUpdateAt property of the book to the current date
    // carModel.create(car)          //create a new book in the database using the bookModel

    // .then(car => {
    //     res.status(201).json(car)  //if the book is successfully created, return a 201 status code.
    // })
    // .catch(err => {
    //     console.log(err)            //if there is error, log it to the console and return a 500 status code.
    //     res.status(500).json(err)
    // })

//GET USERs by IDs..............................................................................
const getCarById = (req,res)  => {
    const id = req.params.id                                    //get the Id from the URL parameters
    carModel.findById(id)                                       //use the bookModel to find a book by its Id
    .then(car  => {
        res.status(200).json(car)
    })
    .catch(err => {                                             //if there's error, log it and return an error msg.
        console.log(err)
        res.status(404).send(err)
    })
}

//DELETE by IDs.................................................................................
const deleteCarById = (req,res)  => {
    const id = req.params.id                                    //get the id of the book to delete from the request parameters
    carModel.findByIdAndRemove(id)                              //use the findByIdAndRemove method on the bookModel to delete the book.
    .then(car => {
        res.status(200).json("Car deleted successfully!")      //if the book is deleted successfully,send the deleted book back to the client.
    })
    .catch(err => {
        console.log(err)                                        //if there is an error, log it an send a 500 Internal Servsr Error.
        res.status(500).json(err)
    })
}

//UPDATE by IDs..................................................................................
const updateCarById = (req,res) => {
    const id = req.params.id                //get the id from the URL parameters
    const car = req.body                   //get the updated book data from the request body
    car.lastUpdateAt = new Date()          //set the lastUpdateAt to the current date
    carModel.findByIdAndUpdate(id, car, {new: true})      //use the Mongoose findByIdAndUpdate method to update the book in the db.
    .then(car =>{
        res.status(200).json("Updated successfully!")       //if the update is successful, return the updated book in the response
    })
    .catch(err =>{
        console.log(err)
        res.send(500).json(err)
    })
}

//Exporting my module
module.exports = {
    getCars,
    getCarById,
    postCar,
    deleteCarById,
    updateCarById,
    upload
}