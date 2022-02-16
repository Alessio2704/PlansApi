const mongoose = require("mongoose");
const Exercise = require("./Exercise");
const User = require("../model/User");

const publicPlanSchema = new mongoose.Schema({

    planName: {
        type: String,
        required:true
    },
    exercises: {
        type: [Exercise]
    },
    createdBy: {
        type: String
    },

    likes: [{ type : mongoose.Types.ObjectId, ref: 'User' }],

    downloades: [{ type : mongoose.Types.ObjectId, ref: 'User'}]
});

module.exports.publicPlan = publicPlanSchema;
module.exports.publicPlanModel = mongoose.model("publicPlanModel", publicPlanSchema);;