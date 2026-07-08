const nodemailer = require("nodemailer");

// Create Transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 60000,
  greetingTimeout: 60000,
  socketTimeout: 60000,
});

// Verify Gmail Connection
transporter.verify((error) => {
    if (error) {
        console.error("❌ Gmail Connection Failed:", error);
    } else {
        console.log("✅ Gmail Connected Successfully");
    }
});

// Send Contact Form Email
const sendContact = async (req, res) => {

    try {

        const { name, email, subject, message } = req.body;

        // Email to Portfolio Owner
        await transporter.sendMail({

            from: `"Portfolio Contact  Inquiry" | <${process.env.EMAIL_USER}>`,

            to: process.env.EMAIL_USER,

            replyTo: email,

            subject: `📩 Thank You for Your Inquiry | ${subject}`,

            html: `
                <div style="font-family: Arial, sans-serif; padding:20px; line-height:1.7;">
                    <h2 style="color:#2563eb;">New Portfolio Contact</h2>
                    <hr>

                    <p><strong>Name:</strong> ${name}</p>

                    <p><strong>Email:</strong> ${email}</p>

                    <p><strong>Subject:</strong> ${subject}</p>

                    <p><strong>Message:</strong></p>

                    <p>${message}</p>

                    <hr>

                    <p style="color:gray;font-size:13px;">
                        This message was submitted through your Portfolio Contact Form.
                    </p>
                </div>
            `

        });

        // Auto Reply to Visitor
        await transporter.sendMail({

            from: `"Piyush Kumar" <${process.env.EMAIL_USER}>`,

            to: email,

            subject: "Thank You for Contacting Piyush Kumar",

            html: `

    <div style="max-width:650px;margin:auto;font-family:Arial,sans-serif;background:#ffffff;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden;">

        <div style="background:#2563eb;padding:25px;text-align:center;color:#ffffff;">

            <h2 style="margin:0;">Thank You for Contacting Me</h2>

            <p style="margin-top:8px;font-size:15px;">
                Your message has been received successfully.
            </p>

        </div>

        <div style="padding:30px;color:#333333;line-height:1.8;">

            <h3>Hello ${name},</h3>

            <p>
                Thank you for contacting me through my portfolio website.
            </p>

            <p>
                I have successfully received your message regarding:
            </p>

            <div style="background:#f8f9fa;padding:15px;border-left:5px solid #2563eb;border-radius:6px;">

                <strong>Subject:</strong> ${subject}

            </div>

            <br>

            <p>
                I usually respond within
                <strong>24–48 hours.</strong>
            </p>

            <p>
                Meanwhile, you can explore my work:
            </p>

            <table cellpadding="8">

                <tr>

                    <td>🌐</td>

                    <td>
                        <a href="https://YOUR-PORTFOLIO-LINK.com">
                            Portfolio Website
                        </a>
                    </td>

                </tr>

                <tr>

                    <td>💼</td>

                    <td>
                        <a href="https://www.linkedin.com/in/piyush-kumar-375265331">
                            LinkedIn
                        </a>
                    </td>

                </tr>

                <tr>

                    <td>💻</td>

                    <td>
                        <a href="https://github.com/Piyush75812">
                            GitHub
                        </a>
                    </td>

                </tr>

            </table>

            <br>

            <p>

                Best Regards,

            </p>

            <h3 style="margin-bottom:5px;">
                Piyush Kumar
            </h3>

            <p style="margin-top:0;color:#555;">
                MERN Stack Developer
            </p>
            <p>
            📱 +91-7564843698
            </p>

            <hr>

            <p style="font-size:12px;color:#777;">

                This is an automated email. Please do not reply directly to this message.

            </p>

        </div>

       </div>
 
       `

        });

        return res.status(200).json({

            success: true,

            message: "Message sent successfully."

        });

    }

    catch (error) {

        console.error("❌ Email Error:", error);

        return res.status(500).json({

            success: false,

            message: "Failed to send email. Please try again later."

        });

    }

};

module.exports = sendContact;