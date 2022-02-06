const mongoose = require("mongoose");
const Set = require("./Set");
const ExerciseStats = require("./ExerciseStats");
const exerciseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    sets: {
        type: [Set],
        required: true
    },
    rowOrder: {
        type: Number,
        required: true
    },
    stats: {
        type: [ExerciseStats]
    }
});

module.exports =  exerciseSchema;