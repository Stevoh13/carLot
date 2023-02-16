const express = require('express');
const {
    getOwners,
    postOwner,
    getOwnerById,
    deleteOwnerById,
    updateOwnerById,
} = require ("../controllers/owners");

const ownerRouter = express.Router()

ownerRouter.get("/", getOwners);
ownerRouter.post("/", postOwner);
ownerRouter.get("/:id", getOwnerById);
ownerRouter.delete("/:id", deleteOwnerById);
ownerRouter.patch("/:id", updateOwnerById);

module.exports = ownerRouter