const router = require("express").Router();
const verify = require("./verifyToken");
const { publicPlan, publicPlanModel} = require("../model/PublicPlan");
const User = require("../model/User");
const Coach = require("../model/Coach");

router.get("/coach/:id", verify, async (req, res) => {

    try {
        const coach = await Coach.findById(req.params.id);
        if (coach._id == req.params.id) {
            try {
                const publicPlan = coach.publicPlans;
                const response = [];
                for (i in publicPlan) {
                    const likes = publicPlan[i].likes.length;
                    const downloads = publicPlan[i].downloads.length;
                    response.push({"planName":publicPlan[i].planName,"exercises":publicPlan[i].exercises,"supersets":publicPlan[i].supersets,"likes":likes, "downloads":downloads});
                }
                res.send(response);
            } catch(error) {
                console.log(error);
                res.send(error);
            }
        } else {
            res.status(400).send({"message":"No Plan"});
        }

    } catch (err) {
        res.status(400).send({"message":"No Coach"});
    };
});

router.post("/:id", verify, async (req, res) => {
        const coach = Coach.findOne({ _id: req.params.id }, function (err, coach) {
            if (!coach) {
                res.status(400).send({"message":"No User"});
            }
            const newPlan = new publicPlanModel(req.body);
            newPlan.createdBy = coach.email;

            const days = new Set();
            for (i in newPlan.exercises) {
                days.add(newPlan.exercises[i].day)
            }
            for (i in newPlan.supersets) {
                days.add(newPlan.supersets[i].day)
            }

            newPlan.workoutDays = days.size;
            coach.publicPlans.push(newPlan);
            coach.save();
            try {
                newPlan.save();
                res.send({"name":newPlan.planName,"createdBy":newPlan.createdBy});
            } catch (err) {
                res.send(err);
            };
        });
});

router.post("/coach/delete/:id", verify, async (req, res) => {
    const coach = Coach.findOne({ _id: req.params.id }, function (err, coach) {
        if (!coach) {
            res.status(400).send({"message":"No User"});
        }
        const publicPlanToDelete = coach.publicPlans.filter(function (publicPlanFound) {
            return (publicPlanFound.planName == req.body.planName);
        }).pop();
        coach.publicPlans.pull(publicPlanToDelete);
        coach.save();
        const publicPlanModelToDelete = publicPlanModel.findOne({"planName":req.body.planName,"createdBy":coach.email}, async function (err, foundPlan) {

            if (err) {
                res.send({"message":"Plan not found in public database"});
            } else {
                try {
                    const planDBToDelete = await publicPlanModel.findByIdAndDelete(foundPlan._id);
                } catch (error) {
                    res.send({"message":"error"});
                }
            }
        });
        res.send({"message":"Plan deleted"});
    });
});

module.exports = router;