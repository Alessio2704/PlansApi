const router = require("express").Router();
const verify = require("./verifyToken");
const PublicExercise = require("../model/PublicExercise");
const User = require("../model/User");

router.get("/", async (req, res) => {
            try {
                const publicExercises = await PublicExercise.find();
                const response = [];
                for (i in publicExercises) {
                    response.push({"exerciseName":publicExercises[i].name});
                }
                res.send(response);
            } catch(error) {
                res.send(error);
            }
});

module.exports = router;