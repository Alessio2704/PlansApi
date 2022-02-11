const mongoose = require("mongoose");
const SetSuperset = require("./SetSuperset");

const supersetSchema = new mongoose.Schema({

    exerciseName: {
        type: String,
        required: true
    },
    sets: {
        type: [SetSuperset],
        required: true
    },
    exerciseOrder: {
        type: Number,
        required: true
    }
});

module.exports =  supersetSchema;