const router = require("express").Router();
const User = require("../model/User");
const Coach = require("../model/Coach");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");
const verify = require("./verifyToken");


router.post("/register", async (req,res) => {

    // Validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send({"message":error.details[0].message});

    // Check if already in database
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send({"message":"Email was already used"});
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        coach: req.body.coach,
        plans: req.body.plans
    });
    
    try {
        const savedUser = await user.save();
        // Create token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.send({userID:savedUser._id, token:token});
    }catch(err) {
        res.status(400).send({"message":err});
    }
});

router.post("/register/coach", async (req,res) => {

    // Validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send({"message":error.details[0].message});

    // Check if already in database
    const emailExist = await Coach.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send({"message":"Email was already used"});
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new coach
    const coach = new Coach({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        plans: req.body.plans,
        publicPlans: req.body.publicPlans,
    });
    
    try {
        const savedCoach = await coach.save();
        // Create token
        const token = jwt.sign({_id: coach._id}, process.env.TOKEN_SECRET);
        res.send({userID:savedCoach._id, token:token});
    }catch(err) {
        res.status(400).send({"message":err});
    }
});

router.post("/login", async (req,res) => {

    // Validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({"message":error.details[0].message});

    // Check if email exists in database
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send({"message":"Email or password is wrong"});

    // Check password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send({"message":"Invalid Password"});

    // Create token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({userID: user._id,"token":token, "name": user.name});
});

router.delete("/delete/:id", verify, async (req,res) => {
    try {
        const userDB = await User.findByIdAndDelete(req.params.id);
        res.status(200).send({"message":"User deleted"})
    } catch(error) {
        res.status(400).send({"message":"User not found"});
    }
});

router.post("/login/coach", async (req,res) => {

    // Validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({"message":error.details[0].message});

    // Check if email exists in database
    const coach = await Coach.findOne({email: req.body.email});
    if (!coach) return res.status(400).send({"message":"Email or password is wrong"});

    // Check password
    const validPassword = await bcrypt.compare(req.body.password, coach.password);
    if(!validPassword) return res.status(400).send({"message":"Invalid Password"});

    // Create token
    const token = jwt.sign({_id: coach._id}, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({userID: coach._id,"token":token, "name": coach.name});
});

router.delete("/delete/coach/:id", verify, async (req,res) => {
    try {
        const coachDB = await Coach.findByIdAndDelete(req.params.id);
        res.status(200).send({"message":"Coach deleted"})
    } catch(error) {
        res.status(400).send({"message":"Coach not found"});
    }
});

router.get("/info/:id",verify, async (req,res) => {
    try {
        const userDB = await User.findById(req.params.id);
        res.status(200).send({name: userDB.name, email: userDB.email, coach: false})
    } catch(error) {
        res.status(400).send({"message":"User not found"});
    }
});

router.get("/info/coach/:id",verify, async (req,res) => {
    try {
        const coachDB = await Coach.findById(req.params.id);
        res.status(200).send({name: coachDB.name, email: coachDB.email, coach: true})
    } catch(error) {
        res.status(400).send({"message":"Coach not found"});
    }
});

module.exports = router;
