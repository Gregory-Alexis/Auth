const User = require("../models/User_model");
const bcrypt = require("bcrypt");
const generateVerificationCode = require("../utils/generateVerificationCode");

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = generateVerificationCode();
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  res.send("Login route");
};

export const logout = async (req, res) => {
  res.send("Logout route");
};
