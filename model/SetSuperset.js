const mongoose = require("mongoose");

const setSupersetSchema = new mongoose.Schema({

    reps: {
        type: Number,
        required: true
    },
    weight: {
        type: String,
        default: 0.0
    },
    latestReps: {
        type: Number
    },
    number: {
        type: Number,
        required: true
    }
});

module.exports =  setSupersetSchema;