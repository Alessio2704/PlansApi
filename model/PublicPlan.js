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
    workoutDays: {
        type: Number
    },
    likes: [{ type : mongoose.Types.ObjectId, ref: 'User' }],
    downloads: [{ type : mongoose.Types.ObjectId, ref: 'User'}],
    notes: {
        type: String
    }
});

module.exports.publicPlan = publicPlanSchema;
module.exports.publicPlanModel = mongoose.model("publicPlanModel", publicPlanSchema);