const mongoose = require("mongoose");
const SetSuperset = require("./SetSuperset");

const supersetStatsSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    sets: {
        type: [SetSuperset]
    }
});

module.exports =  supersetStatsSchema;