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
                const supersetExercise = plan.supersets.filter(function (supersetExercise) {
                    return (supersetExercise.day === req.body.day && supersetExercise.exerciseOrder === req.body.exerciseOrder);
                }).pop();

                for (i in supersetExercise.supersets) {
                    for (j in req.body.supersets) {
                        if (supersetExercise.supersets[i].exerciseOrder === req.body.supersets[j].exerciseOrder) {
                            supersetExercise.supersets[i].sets = req.body.supersets[j].sets
                        }
                    }
                }

                user.save();
                res.send({"message":"Superset Sets Updated"});

            } catch(error) {
                res.send({"message":"Exercise not found"});
            }

        } catch(err) {
            res.send({"message":"Plan not found"});
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
                const supersetExercise = plan.supersets.filter(function (supersetExercise) {
                    return (supersetExercise.day === req.body.day && supersetExercise.exerciseOrder === req.body.exerciseOrder);
                }).pop();

                for (i in supersetExercise.supersets) {
                    for (j in req.body.supersets) {
                        if (supersetExercise.supersets[i].exerciseOrder === req.body.supersets[j].exerciseOrder) {
                            supersetExercise.supersets[i].sets = req.body.supersets[j].sets
                        }
                    }
                }

                coach.save();
                res.send({"message":"Superset Sets Updated"});

            } catch(error) {
                res.send({"message":"Exercise not found"});
            }

        } catch(err) {
            res.send({"message":"Plan not found"});
        }
    });
});
module.exports = router;