const express = require('express');
const router = express.Router();
const sendEmail = require('../emailSender');
const User = require('../db/models/user');

router.post('/subscribe', async (req, res) => {
    const { githubUsername, projectOwnerID, projectName } = req.body;

    try {
        const projectOwner = await User.findOne({ userID: projectOwnerID});

        if (!projectOwner || !projectOwner.emailAddress) {
            return res.status(404).send('Project owner not found or email address is missing')
        }

        const projectOwnerEmail = projectOwner.emailAddress;
        const subject = `New Contributor Request for ${projectName}`;
        const text = `User with GitHub username ${githubUsername} wants to contribute to your project: ${projectName}. Please review and add them as a contributor.`;

        sendEmail(projectOwnerEmail, subject, text);
        res.status(200).send('Contributor request sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;