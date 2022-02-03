const mongoose = require("mongoose");

const setsSchema = new mongoose.Schema({

    reps: {
        type: Number,
        required: true
    },
    weight: {
        type: String,
        default: 0.0
    },
    restTime: {
        type: Number,
        required: true,
    },
    latestReps: {
        type: Number
    }
});

module.exports =  setsSchema;