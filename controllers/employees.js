const employeeModel = require('../models/employees');

//GET USERs.................................................................................
const getEmployees  = (req,res)  => { 
    employeeModel.find()                //using the the 'BookModel' to find all books

    .then(employees  => {               //if query is successful, return JSON array of the books
        res.json(employees)
    })
    .catch(err  => {                //if an error occurs, log the error msg. and send the error to the client
        console.log(err)
        res.send(err)
    })
}

//POST USERs.....................................................................................
const postEmployee = (req,res) => {
    const employee = req.body           //extract the book object from the request body
    employee.createeAt = new Date()  //set the lastUpdateAt property of the book to the current date
    employeeModel.create(employee)          //create a new book in the database using the bookModel

    .then(employee => {
        res.status(201).json(employee)  //if the book is successfully created, return a 201 status code.
    })
    .catch(err => {
        console.log(err)            //if there is error, log it to the console and return a 500 status code.
        res.status(500).json(err)
    })
}

//GET USERs by IDs..............................................................................
const getEmployeeById = (req,res)  => {
    const id = req.params.id        //get the Id from the URL parameters
    employeeModel.findById(id)          //use the bookModel to find a book by its Id
    .then(employee  => {
        res.status(200).json(employee)
    })
    .catch(err => {                 //if there's error, log it and return an error msg.
        console.log(err)
        res.status(404).send(err)
    })
}

//DELETE by IDs.................................................................................
const deleteEmployeeById = (req,res)  => {
    const id = req.params.id                //get the id of the book to delete from the request parameters
    employeeModel.findByIdAndRemove(id)         //use the findByIdAndRemove method on the bookModel to delete the book.
    .then(employee => {
        res.status(200).json("Employee deleted successfully!")      //if the book is deleted successfully,send the deleted book back to the client.
    })
    .catch(err => {
        console.log(err)                    //if there is an error, log it an send a 500 Internal Servsr Error.
        res.status(500).json(err)
    })
}

//UPDATE by IDs..................................................................................
const updateEmployeeById = (req,res) => {
    const id = req.params.id                //get the id from the URL parameters
    const employee = req.body                   //get the updated book data from the request body
    employee.lastUpdateAt = new Date()          //set the lastUpdateAt to the current date
    employeeModel.findByIdAndUpdate(id, employee, {new: true})      //use the Mongoose findByIdAndUpdate method to update the book in the db.
    .then(employee =>{
        res.status(200).json("Updated successfully!")       //if the update is successful, return the updated book in the response
    })
    .catch(err =>{
        console.log(err)
        res.send(500).json(err)
    })
}

//Exporting my module
module.exports = {
    getEmployees,
    getEmployeeById,
    postEmployee,
    deleteEmployeeById,
    updateEmployeeById
}