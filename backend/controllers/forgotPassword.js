const User = require("../models/User_model");
const { SendPasswordResetEmail } = require("../mailtrap/emails");

const crypto = require("crypto");

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    await SendPasswordResetEmail(user.email, `${process.env.RESET_PASSWORD_URL}/${resetToken}`);

    res.status(200).json({ success: true, message: "Password reset email sent successfully" });
  } catch (error) {
    console.log("Error in forgotPassword", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = forgotPassword;
