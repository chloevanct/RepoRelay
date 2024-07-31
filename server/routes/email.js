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
        const text = `A user with the GitHub username ${githubUsername} wants to contribute to your project: ${projectName}. Please review and add them as a contributor on the Github repository.`;

        sendEmail(projectOwnerEmail, subject, text);
        res.status(200).send('Contributor add request sent successfully');
    } catch (error) {
        console.error('Error sending subscribe email:', error);
        res.status(500).send('Internal server error');
    }
});

router.post('/unsubscribe', async (req, res) => {
    const { githubUsername, projectOwnerID, projectName } = req.body;

    try {
        const projectOwner = await User.findOne({ userID: projectOwnerID});

        if (!projectOwner || !projectOwner.emailAddress) {
            return res.status(404).send('Project owner not found or email address is missing')
        }

        const projectOwnerEmail = projectOwner.emailAddress;
        const subject = `Contributor Left: ${projectName}`;
        const text = `A user with the GitHub username ${githubUsername} has left your project: ${projectName}. Please remove them as a contributor on the Github repository.`;

        sendEmail(projectOwnerEmail, subject, text);
        res.status(200).send('Contributor removal request sent successfully');
    } catch (error) {
        console.error('Error sending unsubscribe email:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;