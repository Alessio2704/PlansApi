const router = require("express").Router();
const verify = require("./verifyToken");
const { publicPlan, publicPlanModel } = require("../model/PublicPlan");
const User = require("../model/User");
const Coach = require("../model/Coach");

router.get("/:id", verify, async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        if (user._id == req.params.id) {
            try {
                const publicPlan = await publicPlanModel.find();
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
        const coach = Coach.findOne({ _id: req.params.id }, function (err, coach) {
            if (!coach) {
                res.status(400).send({"message":"No User"});
            }
            const newPlan = new publicPlanModel(req.body);
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

module.exports = router;