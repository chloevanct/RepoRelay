const formData = require('form-data');
const Mailgun = require('mailgun.js');
const dotenv = require('dotenv');

dotenv.config();

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY
});

const sendEmail = (to, subject, text) => {
    if (!to) {
        console.error('Error: Missing recipient email address');
        return;
    }

    const fromEmail = process.env.EMAIL_USER;
    if (!fromEmail) {
        console.error('Error: Missing EMAIL_USER in environment variables');
        return;
    }

    const messageData = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text
    };

    mg.messages.create(process.env.MAILGUN_DOMAIN, messageData)
    .then((res) => {
        console.log('Email sent:', res);
    })
    .catch((err) => {
        console.error('Error sending email:', err);
    });
};

module.exports = sendEmail;