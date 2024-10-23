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

const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "ab56b6ee-1504-4fa7-b8e3-c69ae582352b",
      template_variables: {
        company_info_name: "Auth Company",
        name: name,
      },
    });
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
    throw new Error(`Error sending email: ${error.message}`);
  }
};

module.exports = { sendVerificationEmail, sendWelcomeEmail };
