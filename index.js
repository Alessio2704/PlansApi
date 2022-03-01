const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const plansRoute = require("./routes/plans");
const publicPlansRoute = require("./routes/publicPlans");
const publicExercisesRoute = require("./routes/publicExercises");
const statsRoute = require("./routes/stats");
const supersetStatsRoute = require("./routes/supersetStats");
const updateExerciseRoute = require("./routes/updateExercise");

dotenv.config();

const PORT = process.env.PORT || 3000;

//connect to db
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true},() => console.log("connected to db"));

app.use(express.json());

app.use("/api/user",authRoute);
app.use("/api/user/personalplans", plansRoute);
app.use("/api/user/publicplans", publicPlansRoute);
app.use("/api/user/publicexercises", publicExercisesRoute);
app.use("/api/user/plan/exercisestats", statsRoute);
app.use("/api/user/plan/supersetstats", supersetStatsRoute);
app.use("/api/user/plan/updateexercise", updateExerciseRoute);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
