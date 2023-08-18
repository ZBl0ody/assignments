const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
let userRoutes = require("./routes/userRoutes");
let moviesRoutes = require("./routes/moviesRoutes");

// Middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Connect to the database
mongoose
  .connect(
    "mongodb+srv://Z_Bl0ody:boody01156@cluster0.psfolkh.mongodb.net/movies"
  )
  .then(() => {
    console.log("Database connected💥");
  })
  .catch((err) => {
    console.log("Error connecting to the database: ", err);
  });

app.use("/user", userRoutes);
app.use("/movies", moviesRoutes);

// Server - /port:3000
app.listen(3000, () => {
  console.log("Server started on port: 3000 🎈");
});
