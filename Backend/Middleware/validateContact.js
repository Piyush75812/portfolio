module.exports = (req, res, next) => {

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {

        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });

    }

    if (name.trim().length < 3) {

        return res.status(400).json({
            success: false,
            message: "Name must be at least 3 characters."
        });

    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        return res.status(400).json({
            success: false,
            message: "Please enter a valid email."
        });

    }

    if (subject.trim().length < 5) {

        return res.status(400).json({
            success: false,
            message: "Subject must be at least 5 characters."
        });

    }

    if (message.trim().length < 10) {

        return res.status(400).json({
            success: false,
            message: "Message must be at least 10 characters."
        });

    }

    next();

};
