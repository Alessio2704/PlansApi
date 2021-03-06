const mongoose = require("mongoose");
const publicExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports =  mongoose.model("PublicExercise", publicExerciseSchema);