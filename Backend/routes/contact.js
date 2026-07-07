const express = require("express");

// Create Router
const router = express.Router();

// Import Middleware
const validateContact = require("../middleware/validateContact");

// Import Controller
const sendContact = require("../controllers/contactController");

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