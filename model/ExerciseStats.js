const mongoose = require("mongoose");
const Set = require("./Set");

const exerciseStatsSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    sets: {
        type: [Set]
    },
    frequency: {
        type: Number
    }
});

module.exports =  exerciseStatsSchema;