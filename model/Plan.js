const mongoose = require("mongoose");
const Exercise = require("./Exercise");
const supersetExercise = require("./SupersetExercise")

const planSchema = new mongoose.Schema({

    planName: {
        type: String,
        required:true,
        unique: true
    },
    exercises: {
        type: [Exercise]
    },
    supersets: {
        type: [supersetExercise]
    }
});

module.exports = planSchema;