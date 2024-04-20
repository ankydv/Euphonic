const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    secure: true,
});

const fromEmails = {
    verification: "verifications@euphonic.site",
    support: "support@euphonic.site",
    // Add more 'from' email addresses as needed
};

module.exports = {
    transporter,
    fromEmails,
};
