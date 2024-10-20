const express = require("express");
const connectDB = require("./db/connectDB");
const authRoutes = require("./routes/auth");

const dotenv = require("dotenv").config();

const app = express();

app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on port 3000");
});
