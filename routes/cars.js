const express = require('express');
const passport = require('passport');

const {
    getCars,
    postCar,
    getCarById,
    deleteCarById,
    updateCarById,
    upload
} = require ("../controllers/cars");

const carRouter = express.Router()

carRouter.get("/", getCars);
// carRouter.post("/", postCar);
carRouter.post("/", upload.single("imgUrl"), postCar);
carRouter.get("/:id", getCarById);
carRouter.delete("/:id", deleteCarById);
carRouter.patch("/:id", updateCarById);

module.exports = carRouter