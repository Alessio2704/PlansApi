const mongoose = require("mongoose");
const Plan = require("./Plan");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        min: 6
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
    coach: {
        type: Boolean,
        default: false
    },
    plans: {
        type: [Plan]
    }
});

module.exports = mongoose.model("User", userSchema);