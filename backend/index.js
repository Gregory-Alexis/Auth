const express = require("express");
const connectDB = require("./db/connectDB");
const authRoutes = require("./routes/auth_routes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.use(express.json());

app.listen(5000, () => {
  connectDB();
  console.log("Server is running on port: ", PORT);
});
