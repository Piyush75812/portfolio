require("dotenv").config();


const express = require("express");
const cors = require("cors");
const path = require("path");

const contactRoutes = require("./routes/contact");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Serve Frontend Files
app.use(express.static(path.join(__dirname, "..")));

// Health Check
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});
app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Portfolio Backend Running"
    });
});

// Routes
app.use("/api/contact", contactRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});