// controllers/testResultsController.js
const User = require("../user/model");
const sendEmail = require("../../utils/sendEmail");

const sendEmailWithTestResults = async (email, predictions) => {
  const emailBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #333;">Dyslexia Test Results</h2>
      <p>Dear User,</p>
      <p>Here are your dyslexia test results:</p>
      <ul style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; list-style-type: none;">
        ${predictions.map((prediction, index) => `
          <li style="padding: 8px; border-bottom: 1px solid #ddd;">
            <strong>Model ${index + 1} Prediction:</strong> ${prediction.prediction}
          </li>`).join('')}
      </ul>
      <p>Best regards,<br>LexAfriq</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: 'Your Dyslexia Test Results',
    html: emailBody
  };

  await sendEmail(mailOptions);
};

const handleTestResults = async (req, res) => {
  const { email, predictions } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Store the predictions in the user's record
    user.testResults.push({ date: new Date(), predictions });
    await user.save();

    await sendEmailWithTestResults(email, predictions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error("Error handling test results:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  handleTestResults
};
