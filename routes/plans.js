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

    let userDB = await User.find({_id: req.params.id}, (doc,err) => {
        doc.plans = [req.body];
        if (!err) res.status(200);
        res.status(400).send(err);
    });
});

module.exports = router;