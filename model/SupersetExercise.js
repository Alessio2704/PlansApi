const mongoose = require("mongoose");
const Superset = require("./Superset");

const supersetExerciseSchema = new mongoose.Schema({

    name: {
        type: String,
        default: "Superset"
    },
    supersets: {
        type: [Superset],
        required: true
    },
    exerciseOrder: {
        type: Number,
        required: true
    },
    day: {
        type:String,
        required: true
    },
    restTime: {
        type:Number,
        required: true
    }
});

module.exports =  supersetExerciseSchema;