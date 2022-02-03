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
        let user = await User.find({}, (doc, err) => {
            doc.plans = [req.body.plan];
            doc.save();
            res.send(doc);
        });
        
    } catch(error) {
       res.send(error);
    }
});

module.exports = router;