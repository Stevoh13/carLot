const express = require('express');
const {
    getCars,
    postCar,
    getCarById,
    deleteCarById,
    updateCarById,
} = require ("../controllers/cars");

const carRouter = express.Router()

carRouter.get("/", getCars);
carRouter.post("/", postCar);
carRouter.get("/:id", getCarById);
carRouter.delete("/:id", deleteCarById);
carRouter.patch("/:id", updateCarById);

module.exports = carRouter