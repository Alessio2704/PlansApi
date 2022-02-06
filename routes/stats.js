const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User")

router.post("/:id", verify, (req, res) => {

    const user = User.findOne({_id:req.params.id}, function (err, user) {
        try {
            const plan = user.plans.filter(function (plans) {
                return plans.planName === req.body.planName;
            }).pop();
            try {
                const exercise = plan.exercises.filter(function (exercises) {
                    return (exercises.name === req.body.exerciseName && exercises.day === req.body.exerciseDay);
                }).pop();
                exercise.stats.push(req.body.stats);
                res.send({"message": "Stats Uploaded"});
                user.save();
            } catch(error) {
                res.send({"message":"Exercise not found"})
            }

        } catch(err) {
            res.send({"message":"Plan not found"})
        }
    });
});

module.exports = router;