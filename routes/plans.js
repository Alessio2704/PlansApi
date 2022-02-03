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

router.put("/:id", verify, async (req, res) => {

    try {
        const filter = { _id: req.params.id }
        const update = {$push: {plans: req.body}}
        let user = await User.findOneAndUpdate(filter, update);
        res(user)
        
    } catch(error) {
       res.send({"message":"No personal plans found"});
    }
});

module.exports = router;