const mongoose = require("mongoose");
const Exercise = require("./Exercise");

const publicpPlanSchema = new mongoose.Schema({

    planName: {
        type: String,
        required:true
    },
    weeks: {
        type: [[Exercise]]
    },
    createdBy: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("PublicPlan", publicpPlanSchema);