const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User")

router.post("/:id", (req, res) => {

    const user = User.findOne({_id:req.params.id}, function (err, user) {
        const plan = user.plans.filter(function (plans) {
            return plans.planName === req.body.planName;
        }).pop();
        const exercise = plan.exercises.filter(function (exercise) {
            return exercise.name === req.body.exerciseName;
        }).pop();
        res.send(exercise);
        user.save();
    });
});

module.exports = router;