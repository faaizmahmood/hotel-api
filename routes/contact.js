const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'faizzafar44@gmail.com',
        pass: 'faiz_zafar3777018',
    },
});


router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    let mailOptions = {
        from: 'LuxeSuite <faizzafar44@gmail.com>',
        to: 'faizzafar44@gmail.com',
        subject: 'New Contact Form Submission',
        text: `You have received a new message from ${name} (${email}).\n\nMessage:\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error("Nodemailer Error:", error); 
        res.status(500).json({ message: 'Failed to send message', error: error.message });
    }
});

module.exports = router;
