const mongoose = require("mongoose");
const Exercise = require("./Exercise");

const publicpPlanSchema = new mongoose.Schema({

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

module.exports = publicpPlanSchema
module.exports.publicpPlan = publicpPlanSchema;
module.exports.publicpPlanModel = mongoose.model("PublicPlan", publicpPlanSchema);;