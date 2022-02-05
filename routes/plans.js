const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User")

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
            console.log(i.planName);
            if (i.planName == req.body.planName) {
                prova.push(i);
            }
        }

        if (prova.length == 1) {
            res.status(200).send({"message":"Plan found"});
        } else {
            res.status(404).send({"message":"No plan found"});
        }

    } catch(error) {
       res.status(404).send({"message":"No user found"});
    }
});

router.put("/:id", verify, async (req, res) => {

    try {
        let user = await User.update({_id:req.params.id},{$push: {plans: req.body}});
        res.send({"message": "ok"});
    } catch(error) {
       res.send({"message":"Error"});
    }
});

router.post("/delete/:id", verify, async (req, res) => {

    try {
        let user = await User.update({_id:req.params.id},{$pull: {plans: req.body}});
        res.send({"message": "ok"});
    } catch(error) {
       res.send({"message":"Error"});
    }
});

module.exports = router;