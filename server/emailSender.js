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

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
            }
            h2 {
                font-size: 20px;
                color: #333333;
            }
            p {
                font-size: 16px;
                color: #666666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>${subject}</h2>
            <p>${text}</p>
            <p>This is an automated message, <b>please do not reply.</b></p>
        </div>
    </body>
    </html>
    `;

    const messageData = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text,
        html: htmlContent
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