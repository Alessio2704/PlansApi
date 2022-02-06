const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User")

router.post("/:id", verify, (req, res) => {

    const user = User.findOne({_id:req.params.id}, function (err, user) {
        const plan = user.plans.filter(function (plans) {
            return plans.planName === req.body.planName;
        }).pop();
        const exercise = plan.exercises.filter(function (exercises) {
            return (exercises.name === req.body.exerciseName && exercises.day === req.body.exerciseDay)
        }).pop();
        exercise.stats.push(req.body.stats)
        res.send({"message": "Stats Uploaded"});
        user.save();
        
    });
});

module.exports = router;