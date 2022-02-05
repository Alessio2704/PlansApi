const jwt = require("jsonwebtoken");
const env = require("dotenv");

module.exports = function (req,res,next) {
    const token = req.header("auth-token");
    if(!token) return res.status(401).send({"message":"Access Denied"});

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified._id)
        console.log(req.params.id)

        if (!verified) {
            res.status(400).send({"message":"Invalid Token"});
            return
        }
        if (verified._id != req.id) {
            res.status(400).send({"message":"Invalid Token for this user"});
            return
        }
        req.user = verified;
        next();
    }catch {
        res.status(400).send({"message":"Invalid Token a"});
    }
}
