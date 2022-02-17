const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");
const Coach = require("../model/Coach");

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

                for (i in exercise.sets) {
                    exercise.sets[i].latestReps = req.body.stats.sets[i].reps;
                }

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

router.put("/:id", verify, (req, res) => {

    const user = User.findOne({_id:req.params.id}, function (err, user) {
        try {
            const plan = user.plans.filter(function (plans) {
                return plans.planName === req.body.planName;
            }).pop();
            try {
                const exercise = plan.exercises.filter(function (exercises) {
                    return (exercises.name === req.body.exerciseName && exercises.day === req.body.exerciseDay);
                }).pop();
                res.send(exercise.stats);
                user.save();
            } catch(error) {
                res.send({"message":"Exercise not found"})
            }

        } catch(err) {
            res.send({"message":"Plan not found"})
        }
    });
});

router.post("/coach/:id", verify, (req, res) => {

    const coach = Coach.findOne({_id:req.params.id}, function (err, coach) {
        try {
            const plan = coach.plans.filter(function (plans) {
                return plans.planName === req.body.planName;
            }).pop();
            try {
                const exercise = plan.exercises.filter(function (exercises) {
                    return (exercises.name === req.body.exerciseName && exercises.day === req.body.exerciseDay);
                }).pop();
                exercise.stats.push(req.body.stats);
                res.send({"message": "Stats Uploaded"});
                coach.save();
            } catch(error) {
                res.send({"message":"Exercise not found"})
            }

        } catch(err) {
            res.send({"message":"Plan not found"})
        }
    });
});

router.put("/coach/:id", verify, (req, res) => {

    const coach = Coach.findOne({_id:req.params.id}, function (err, coach) {
        try {
            const plan = coach.plans.filter(function (plans) {
                return plans.planName === req.body.planName;
            }).pop();
            try {
                const exercise = plan.exercises.filter(function (exercises) {
                    return (exercises.name === req.body.exerciseName && exercises.day === req.body.exerciseDay);
                }).pop();
                res.send(exercise.stats);
                coach.save();
            } catch(error) {
                res.send({"message":"Exercise not found"})
            }

        } catch(err) {
            res.send({"message":"Plan not found"})
        }
    });
});

module.exports = router;