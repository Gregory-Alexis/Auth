const User = require("../models/User_model");

const { sendWelcomeEmail } = require("../mailtrap/emails");

const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired verification code" });
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiresAt = null;

    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: null,
      },
    });
  } catch (error) {
    console.log("Error in verifyEmail", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = verifyEmail;