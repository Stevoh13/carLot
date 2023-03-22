const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CarsSchema = new Schema({
    brands: {
        type: 'String',
        required: true
    },

    model: {
        type: 'String',
        required: true
    },

    year: {
        type: Number,
        required: true
    },

    reg_num: {
        type: 'String',
        required: true
    },

    imgUrl: {
        type: 'String',
        required: true
    },

    color: {
        type: 'String',
        required: true
    },

    transmission: {
        type: 'String',
        required: true
    },

    bodyStyle: {
        type: 'String',
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'owners'
    },

    createAt: {
        type: Date,
        default: Date.now
    },
    lastUpdateAt: {                 
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('cars', CarsSchema)