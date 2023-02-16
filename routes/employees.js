const express = require('express');
const {
    getEmployees,
    postEmployee,
    getEmployeeById,
    deleteEmployeeById,
    updateEmployeeById,
} = require ("../controllers/employees");

const employeeRouter = express.Router()

employeeRouter.get("/", getEmployees);
employeeRouter.post("/", postEmployee);
employeeRouter.get("/:id", getEmployeeById);
employeeRouter.delete("/:id", deleteEmployeeById);
employeeRouter.patch("/:id", updateEmployeeById);

module.exports = employeeRouter