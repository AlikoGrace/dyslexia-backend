const express = require('express');
const router = express.Router();
const { createNewUser, authenticateUser } = require("./controller");
const auth = require('./../../middleware/auth');
const { sendVerificationOTPEmail } = require("./../email_verification/controller");
const ChildRoutes= require("../child")

// Protected route
router.get("/private_data", auth, (req, res) => {
    res.status(200).json({ message: `You are in a private territory of ${req.currentUser.email}` });
});

// Signin
router.post("/signin", async (req, res) => {
    console.log("Received request at /api/v1/user"); // Add this line

    try {
        let { email, password } = req.body;
        email = email.trim();
        password = password.trim();

        if (!(email && password)) {
            return res.status(400).json({ error: 'Empty credentials supplied' });
        }

        const authenticatedUser = await authenticateUser({ email, password });

        if (authenticatedUser.error) {
            return res.status(400).json({ error: authenticatedUser.error });
        }

        return res.status(200).json(authenticatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Signup
router.post("/signup", async (req, res) => {
    try {
        let { name, email, password } = req.body;
        name = name.trim();
        email = email.trim();
        password = password.trim();

        if (!(name && email && password)) {
            return res.status(400).json({ error: 'Empty input fields!' });
        } else if (!/^[a-zA-Z ]*$/.test(name)) {
            return res.status(400).json({ error: "Invalid name entered" });
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return res.status(400).json({ error: "Invalid email entered" });
        } else if (password.length < 8) {
            return res.status(400).json({ error: 'Password is too short' });
        } else {
            // Create user, good credentials
            const newUser = await createNewUser({
                name,
                email,
                password,
            });

            if (newUser.error) {
                return res.status(400).json({ error: newUser.error });
            }

            await sendVerificationOTPEmail(email);
            return res.status(201).json(newUser);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.use("/register-child", ChildRoutes);


module.exports = router;
