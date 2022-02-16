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