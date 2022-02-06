const mongoose = require("mongoose");
const Set = require("./Set");

const exerciseStatsSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    sets: {
        type: [Set]
    }
});

module.exports =  exerciseStatsSchema;