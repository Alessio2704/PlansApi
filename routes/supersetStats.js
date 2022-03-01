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
                const superset = plan.supersets.filter(function (supersetDB) {
                    return (supersetDB.day === req.body.exerciseDay && supersetDB.exerciseOrder === req.body.exerciseOrder);
                }).pop();
                for (i in superset.supersets) {
                    for (j in req.body.supersets) {
                        if (superset.supersets[i].exerciseName === req.body.supersets[j].exerciseName) {
                            superset.supersets[i].stats.push(req.body.supersets[j].stats);
                            for (z in superset.supersets[i].sets) {
                                for (y in req.body.supersets[j].stats.sets) {
                                    if (superset.supersets[i].sets[z].number === req.body.supersets[j].stats.sets[y].number) {
                                        console.log(req.body.supersets[j].stats.sets[y].reps);
                                        console.log(req.body.supersets[j].stats.sets[y].weight);
                                        superset.supersets[i].sets[z].latestReps = req.body.supersets[j].stats.sets[y].reps;
                                        superset.supersets[i].sets[z].weight = req.body.supersets[j].stats.sets[y].weight;
                                    }
                                }
                            }
                        }
                    }
                }
                user.save();
                res.send({"message": "Superset Stats Uploaded"});
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
                const superset = plan.supersets.filter(function (supersetDB) {
                    return (supersetDB.day === req.body.exerciseDay && supersetDB.exerciseOrder === req.body.exerciseOrder);
                }).pop();
                for (i in superset.supersets) {
                    for (j in req.body.supersets) {
                        if (superset.supersets[i].exerciseName === req.body.supersets[j].exerciseName) {
                            superset.supersets[i].stats.push(req.body.supersets[j].stats);
                            for (z in superset.supersets[i].sets) {
                                for (y in req.body.supersets[j].stats.sets) {
                                    if (superset.supersets[i].sets[z].number === req.body.supersets[j].stats.sets[y].number) {
                                        superset.supersets[i].sets[z].latestReps = req.body.supersets[j].stats.sets[y].reps;
                                        superset.supersets[i].sets[z].weight = req.body.supersets[j].stats.sets[y].weight;
                                    }
                                }
                            }
                        }
                    }
                }
                coach.save();
                res.send({"message": "Superset Stats Uploaded"});
            } catch(error) {
                res.send({"message":"Exercise not found"})
            }
        } catch(err) {
            res.send({"message":"Plan not found"})
        }
    });
});

module.exports = router;