const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { addChild, updateChild, deleteChild } = require("./controller");
const User = require('../user/model');

// Add a new child
router.post("/", auth, async (req, res) => {
    try {
        console.log("Received request at /api/v1/user/register-child"); // Add this line

        const parentId = req.currentUser._id; // Assuming the auth middleware sets req.currentUser
        const { name, age, grade } = req.body;

        const existingUser = await User.findById(parentId);
        if (!existingUser) {
            return res.status(400).json({ message: 'Parent user not found' });
        }

        const newChild = await addChild({ name, age, grade, parent: parentId });
        res.status(201).json(newChild);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an existing child
router.put("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, grade } = req.body;

        const updatedChild = await updateChild(id, { name, age, grade });
        res.json(updatedChild);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an existing child
router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;

        const deletedChild = await deleteChild(id);
        res.json(deletedChild);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
