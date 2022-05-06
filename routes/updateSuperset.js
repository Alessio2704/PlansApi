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

                console.log(supersetExercise);

                for (i in supersetExercise.supersets) {
                    for (j in req.body.supersets) {
                        if (supersetExercise.supersets[i].exerciseOrder === req.body.supersets[j].exerciseOrder) {
                            for (a in supersetExercise.supersets[i].sets) {
                                for (b in req.body.supersets[j].sets) {
                                    if (supersetExercise.supersets[i].sets[a].number === req.body.supersets[j].sets[b].number) {
                                        console.log(supersetExercise.supersets[i].sets[a])
                                        console.log(req.body.supersets[j].sets[b])
                                        supersetExercise.supersets[i].sets[a] = req.body.supersets[j].sets[b]  
                                    }
                                }
                            }
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
                            for (a in supersetExercise.supersets[i].sets) {
                                for (b in req.body.supersets[j].sets) {
                                    if (supersetExercise.supersets[i].sets[a].number === req.body.supersets[j].sets[b].number) {
                                        supersetExercise.supersets[i].sets[a] = req.body.supersets[j].sets[b]  
                                    }
                                }
                            }
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