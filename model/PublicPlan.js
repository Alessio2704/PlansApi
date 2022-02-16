const mongoose = require("mongoose");
const Exercise = require("./Exercise");

const publicPlanSchema = new mongoose.Schema({

    planName: {
        type: String,
        required:true
    },
    exercises: {
        type: [Exercise]
    },
    createdBy: {
        type: String,
        required: true
    }
});

module.exports.publicPlan = publicPlanSchema;
module.exports.publicPlanModel = mongoose.model("publicPlanModel", publicPlanSchema);;