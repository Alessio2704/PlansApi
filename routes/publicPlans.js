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
                    response[i] = {"planName":publicPlan[i].planName,"exercises":publicPlan[i].exercises,"supersets":publicPlan[i].supersets,"likes":publicPlan[i].likes.count(), "downloads":publicPlan[i].downloads.count()};
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