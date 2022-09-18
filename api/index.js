//? Library imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
// const cors = require("cors")

//? Code imports
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

//? Config
dotenv.config();

//? Database
mongoose.connect(process.env.MONGO_URL, () => {
   console.log("Connected to MongoDB !");
});

//? Access Images from API public folder
app.use("/images", express.static(path.join(__dirname, "public/images")));

//? Middleware
// app.use(cors())
// app.use(helmet());
app.use(express.json());
app.use(morgan("common"));

// Paramétrage des headers HTTP :
app.use((req, res, next) => {
   // Accéder à notre API depuis n'importe quelle origine
   res.setHeader("Access-Control-Allow-Origin", "*");
   // Ajouter les headers mentionnés aux requêtes envoyées vers notre API
   res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
   );
   // Envoyer des requêtes avec les méthodes mentionnées
   res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
   );
   next();
});

//? Multer config
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "public/images");
   },
   filename: (req, file, cb) => {
      cb(null, file.originalname);
   },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
   try {
      return res.status(200).json("File uploaded successfully");
   } catch (err) {
      console.log(err);
   }
});

//? Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
// app.get("/", (req, res) => {
//     res.send("Welcome to homepage !") //? Test
// })

app.listen(8800, () => {
   console.log("Backend server is running !");
});
