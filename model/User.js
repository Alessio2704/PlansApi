const mongoose = require("mongoose");
const Plan = require("./Plan");

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        min: 6,
        unique: true
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    dateSignedIn: {
        type: Date,
        default: Date.now
    },
    plans: {
        type: [Plan]
    }
});

module.exports = mongoose.model("User", userSchema);