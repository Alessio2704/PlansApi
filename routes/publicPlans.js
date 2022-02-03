const router = require("express").Router();
const verify = require("./verifyToken");
const PublicPlan = require("../model/PublicPlan");
const User = require("../model/User");

router.get("/:userID", verify, async (req, res) => {

    try {
        const user = await User.findById(req.params.userID);
        if (user._id == req.params.userID) {
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

router.post("/:userID", verify, async (req, res) => {
    try {
        const user = await User.findById(req.params.userID);
        if (user.coach == true) {
            const newPlan = new PublicPlan({
                planName: req.body.planName,
                exercises: req.body.exercises,
                createdBy: user.email
            });
            try {
                newPlan.save();
                res.send({"name":newPlan.planName, "exercises":newPlan.exercises, "createdBy":newPlan.createdBy});
            } catch (err) {
                res.send(err);
            };
        } else {
            res.status(400).send({"message":"This is not a coach account"});
        }
    } catch(error) {
        res.status(400).send({"message":"No User"});
    }
});

module.exports = router;