const express = require("express");
const connectDB = require("./db/connectDB");

const dotenv = require("dotenv").config();

const app = express();

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on port 3000");
});
