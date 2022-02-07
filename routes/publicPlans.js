const router = require("express").Router();
const verify = require("./verifyToken");
const PublicPlan = require("../model/PublicPlan");
const User = require("../model/User");
const Coach = require("../model/Coach");

router.get("/:id", verify, async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        if (user._id == req.params.id) {
            try {
                const publicPlan = await PublicPlan.find();
                const response = {};
                for (i in publicPlan) {
                    response[i] = {"planName":publicPlan[i].planName,"exercises":publicPlan[i].exercises,"createdBy":publicPlan[i].createdBy};
                }
                res.send(response);
            } catch(error) {
                res.send(error);
            }
        } else {
            res.status(400).send({"message":"No User"});
        }

    } catch (err) {
        res.status(400).send({"message":"No User"});
    };
});

router.post("/:id", verify, async (req, res) => {
    try {
        const coach = await Coach.findById(req.params.id);
            const newPlan = new PublicPlan({
                planName: req.body.planName,
                exercises: req.body.exercises,
                createdBy: coach.email
            });
            try {
                newPlan.save();
                res.send({"name":newPlan.planName, "exercises":newPlan.exercises, "createdBy":newPlan.createdBy});
            } catch (err) {
                res.send(err);
            };
    } catch(error) {
        res.status(400).send({"message":"No User"});
    }
});

module.exports = router;