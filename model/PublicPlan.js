const mongoose = require("mongoose");
const Exercise = require("./Exercise");
const User = require("../model/User");
const supersetExercise = require("./SupersetExercise");

const publicPlanSchema = new mongoose.Schema({

    planName: {
        type: String,
        required:true
    },
    exercises: {
        type: [Exercise]
    },
    supersets: {
        type: [supersetExercise]
    },
    createdBy: {
        type: String
    },

    likes: [{ type : mongoose.Types.ObjectId, ref: 'User' }],

    downloades: [{ type : mongoose.Types.ObjectId, ref: 'User'}]
});

module.exports.publicPlan = publicPlanSchema;
module.exports.publicPlanModel = mongoose.model("publicPlanModel", publicPlanSchema);;