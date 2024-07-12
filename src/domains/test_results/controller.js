// controllers/testResultsController.js
const User = require("../user/model");
const sendEmail = require("../../utils/sendEmail");

const sendEmailWithTestResults = async (email, predictions) => {
  const emailBody = `
    <p>Here are your dyslexia test results:</p>
    <ul>
      ${predictions.map((prediction, index) => `<li>Model ${index + 1} Prediction: ${prediction.prediction}</li>`).join('')}
    </ul>
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
