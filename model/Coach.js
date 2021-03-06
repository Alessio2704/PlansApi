const mongoose = require("mongoose");
const Plan = require("./Plan");
const { publicPlan, publicPlanModel } = require("./PublicPlan");

const coachSchema = new mongoose.Schema({

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
    plans: {
        type: [Plan]
    },
    publicPlans: {
        type: [publicPlan]
    }

});

module.exports = mongoose.model("Coach", coachSchema);