const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoute = require("./routes/users.routes");
const authRoute = require("./routes/auth.routes");
const postRoute = require("./routes/posts.routes");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connected to MongoDB !");
});

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app;

// routes

// Test
// app.get("/", (req, res) => {
//     res.send("Welcome to homepage !")
// })

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
    console.log("Backend server is running !");
});
