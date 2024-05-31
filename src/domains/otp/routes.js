const express = require("express");
const router = express.Router();
const { sendOTP, verifyOTP } = require("./controller");

// Route to verify OTP
router.post("/verify", async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ error: "Email and OTP are required." });
        }

        const result = await verifyOTP({ email, otp });

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(200).json({ valid: result.valid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route to request new verification OTP
router.post("/", async (req, res) => {
    try {
        const { email, subject, message, duration } = req.body;

        if (!email || !subject || !message) {
            return res.status(400).json({ error: "Email, subject, and message are required." });
        }

        const result = await sendOTP({ email, subject, message, duration });

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
