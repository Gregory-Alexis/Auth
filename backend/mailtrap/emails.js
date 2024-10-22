const { VERIFICATION_EMAIL_TEMPLATE } = require("./emailTemplate");
const { mailtrapClient, sender } = require("./mailtrap.config");

const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Account Verification",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Account Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
    throw new Error(`Error sending email: ${error.message}`);
  }
};

module.exports = sendVerificationEmail;
