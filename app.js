const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoute = require("./routes/auth");

const app = express();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cdef9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

//Middleware
app.use(express.json());

//Routes Middleware
app.use("/api/user/", authRoute);

//Connecting to the Database
mongoose
  .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Connected to the DataBase Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

//No Routes Found Middleware
app.use((req, res, next) => {
  res.status(404).json("No Routes Found!");
});

// Default errorHandling Middleware
app.use((error, req, res, next) => {
  res.status(error.errorCode).json(error.message);
});

//Creating Server
app.listen(3000, () => {
  console.log("Listening to the Port 3000");
});
