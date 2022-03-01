const mongoose = require("mongoose");
const SetSuperset = require("./SetSuperset");
const SupersetStats = require("./SupersetStats");

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
    },
    stats: {
        type: [SupersetStats]
    }
});

module.exports =  supersetSchema;