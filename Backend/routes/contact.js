const express = require("express");

// Create Router
const router = express.Router();

// Import Middleware
const validateContact = require("../Middleware/validateContact");

// Import Controller
const sendContact = require("../Controllers/contactController");

// Health Check Route
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Contact API is working."
    });
});

// Contact Form Route
router.post("/", validateContact, sendContact);

module.exports = router;