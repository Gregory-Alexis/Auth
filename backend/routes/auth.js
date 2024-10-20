const express = require("express");

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("Signup router");
});

router.get("/login", (req, res) => {
  res.send("Login router");
});

router.get("/logout", (req, res) => {
  res.send("Logout router");
});

module.exports = router;
