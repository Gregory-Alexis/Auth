const express = require("express");
const connectDB = require("./db/connectDB");
const authRoutes = require("./routes/auth_routes");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Server is running on port: ", PORT);
});
