const mongoose = require("mongoose");
const Exercise = require("./Exercise");

const planSchema = new mongoose.Schema({

    planName: {
        type: String,
        required:true
    },
    exercises: {
        type: [Exercise]
    }
});

module.exports = planSchema;