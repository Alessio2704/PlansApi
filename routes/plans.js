const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");
const Coach = require("../model/Coach");

router.get("/:id", verify, async (req, res) => {

    try {
        const userDB = await User.findOne({ _id: req.params.id });
        res.send(userDB.plans);
    } catch(error) {
       res.send({"message":"No personal plans found"});
    }
});

router.post("/check/:id", verify, async (req, res) => {

    try {
        const userDB = await User.findOne({_id:req.params.id});
        let prova = []

        for (i in userDB.plans) {
            if (userDB.plans[i].planName == req.body.planName) {
                prova.push(userDB.plans[i]);
            }
        }

        if (prova.length == 1) {
            res.status(200).send({"message":"Plan found"});
        } else {
            res.status(200).send({"message":"No plan found"});
        }

    } catch(error) {
       res.status(404).send({"message":"No user found"});
    }
});

router.put("/:id", verify, async (req, res) => {

    try {
        let user = await User.updateOne({_id:req.params.id},{$push: {plans: req.body}});
        res.send({"message": "ok"});
    } catch(error) {
       res.send({"message":"Error"});
    }
});

router.post("/delete/:id", verify, async (req, res) => {

    try {
        let user = await User.updateOne({_id:req.params.id},{$pull: {plans: req.body}});
        res.send({"message": "ok"});
    } catch(error) {
       res.send({"message":"Error"});
    }
});

router.post("/delete/exercise/:id", verify, (req, res) => {
    const user = User.findOne({_id:req.params.id}, function (err, user) {
        if (err) res.status(404).send({"message":"User not found"});
        try {
            const plan = user.plans.filter(function (plans) {
                return plans.planName === req.body.planName;
            }).pop();

            if (req.body.exerciseName !== "Superset") {
                try {
                    const exercise = plan.exercises.filter(function (exerciseDB) {
                        return (exerciseDB.name === req.body.exerciseName && exerciseDB.day === req.body.exerciseDay && exerciseDB.rowOrder === req.body.rowOrder);
                    }).pop();
                    
                    plan.exercises.pull(exercise);
                    user.save();
                    res.send({"message":"Exercise deleted"});
                } catch(error) {
                    res.send({"message":"Exercise not found"});
                }
            } else {
                try {
                    const superset = plan.supersets.filter(function (supersetDB) {
                        return (supersetDB.name === req.body.exerciseName && supersetDB.day === req.body.exerciseDay && supersetDB.exerciseOrder === req.body.rowOrder);
                    }).pop();
                    plan.supersets.pull(superset);
                    user.save();
                    res.send({"message":"Superset deleted"});
                } catch(error) {
                    res.send({"message":"Superset not found"});
                }
            }
        } catch(err) {
            res.send({"message":"Plan not found"});
        }
    });
});

router.post("/add/exercise/:id", verify, (req, res) => {
    const user = User.findOne({_id:req.params.id}, function (err, user) {
        if (err) res.status(404).send({"message":"User not found"});
        try {
            const plan = user.plans.filter(function (plans) {
                return plans.planName === req.body.planName;
            }).pop();

            if (req.body.exerciseName !== "Superset") {
                try {
                    const exercise = {
                        name: req.body.exerciseName,
                        day: req.body.day,
                        sets: req.body.sets,
                        rowOrder: req.body.rowOrder
                    };
                    plan.exercises.push(exercise);
                    user.save();
                    res.send({"message":"Exercise added"});
                } catch(error) {
                    console.log(error);
                    res.send({"message":"Exercise adding error"});
                }
            } else {
                try {
                    const supersetExercise = {
                        supersets: req.body.supersets,
                        exerciseOrder: req.body.exerciseOrder,
                        day: req.body.day,
                        restTime: req.body.restTime
                    };
                    plan.supersets.push(supersetExercise);
                    user.save();
                    res.send({"message":"Superset added"});
                } catch(error) {
                    console.log(error);
                    res.send({"message":"Superset adding error"});
                }
            }
        } catch(err) {
            res.send({"message":"Plan not found"});
        }
    });
});

router.post("/add/exercise/coach/:id", verify, (req, res) => {
    const coach = Coach.findOne({_id:req.params.id}, function (err, coach) {
        if (err) res.status(404).send({"message":"Coach not found"});
        try {
            const plan = coach.plans.filter(function (plans) {
                return plans.planName === req.body.planName;
            }).pop();

            if (req.body.exerciseName !== "Superset") {
                try {
                    const exercise = {
                        name: req.body.exerciseName,
                        day: req.body.day,
                        sets: req.body.sets,
                        rowOrder: req.body.rowOrder
                    };
                    plan.exercises.push(exercise);
                    coach.save();
                    res.send({"message":"Exercise added"});
                } catch(error) {
                    console.log(error);
                    res.send({"message":"Exercise adding error"});
                }
            } else {
                try {
                    const supersetExercise = {
                        supersets: req.body.supersets,
                        exerciseOrder: req.body.exerciseOrder,
                        day: req.body.day,
                        restTime: req.body.restTime
                    };
                    plan.supersets.push(supersetExercise);
                    coach.save();
                    res.send({"message":"Superset added"});
                } catch(error) {
                    console.log(error);
                    res.send({"message":"Superset adding error"});
                }
            }
        } catch(err) {
            res.send({"message":"Plan not found"});
        }
    });
});

router.post("/delete/exercise/coach/:id", verify, (req, res) => {
    const coach = Coach.findOne({_id:req.params.id}, function (err, coach) {
        if (err) res.status(404).send({"message":"Coach not found"});
        try {
            const plan = coach.plans.filter(function (plans) {
                return plans.planName === req.body.planName;
            }).pop();

            if (req.body.exerciseName !== "Superset") {
                try {
                    const exercise = plan.exercises.filter(function (exerciseDB) {
                        return (exerciseDB.name === req.body.exerciseName && exerciseDB.day === req.body.exerciseDay && exerciseDB.rowOrder === req.body.rowOrder);
                    }).pop();
                    
                    plan.exercises.pull(exercise);
                    coach.save();
                    res.send({"message":"Exercise deleted"});
                } catch(error) {
                    res.send({"message":"Exercise not found"});
                }
            } else {
                try {
                    const superset = plan.supersets.filter(function (supersetDB) {
                        return (supersetDB.name === req.body.exerciseName && supersetDB.day === req.body.exerciseDay && supersetDB.exerciseOrder === req.body.rowOrder);
                    }).pop();
                    plan.supersets.pull(superset);
                    coach.save();
                    res.send({"message":"Superset deleted"});
                } catch(error) {
                    res.send({"message":"Superset not found"});
                }
            }
        } catch(err) {
            res.send({"message":"Plan not found"});
        }
    });
});

router.get("/coach/:id", verify, async (req, res) => {

    try {
        const coachDB = await Coach.findOne({ _id: req.params.id });
        res.send(coachDB.plans);
    } catch(error) {
       res.send({"message":"No personal plans found"});
    }
});

router.post("/coach/check/:id", verify, async (req, res) => {

    try {
        const coachDB = await Coach.findOne({_id:req.params.id});
        let prova = []

        for (i in coachDB.plans) {
            if (coachDB.plans[i].planName == req.body.planName) {
                prova.push(coachDB.plans[i]);
            }
        }

        if (prova.length == 1) {
            res.status(200).send({"message":"Plan found"});
        } else {
            res.status(200).send({"message":"No plan found"});
        }

    } catch(error) {
       res.status(404).send({"message":"No user found"});
    }
});

router.post("/coach/check/published/:id", verify, async (req, res) => {

    try {
        const coachDB = await Coach.findOne({_id:req.params.id});
        let prova = []

        for (i in coachDB.publicPlans) {
            if (coachDB.publicPlans[i].planName == req.body.planName) {
                prova.push(coachDB.publicPlans[i]);
            }
        }

        if (prova.length == 1) {
            res.status(200).send({"message":"Plan found"});
        } else {
            res.status(200).send({"message":"No plan found"});
        }

    } catch(error) {
       res.status(404).send({"message":"No user found"});
    }
});

router.put("/coach/:id", verify, async (req, res) => {

    try {
        let coach = await Coach.updateOne({_id:req.params.id},{$push: {plans: req.body}});
        res.send({"message": "ok"});
    } catch(error) {
       res.send({"message":"Error"});
    }
});

router.post("/coach/delete/:id", verify, async (req, res) => {

    try {
        let coach = await Coach.updateOne({_id:req.params.id},{$pull: {plans: req.body}});
        res.send({"message": "ok"});
    } catch(error) {
       res.send({"message":"Error"});
    }
});

module.exports = router;