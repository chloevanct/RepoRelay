// Adapted following MongoDB tutorial
// Accessed June 17 2024 - https://www.mongodb.com/resources/languages/express-mongodb-rest-api-tutorial

/* ChatGPT 4.0 June 27 2024
Prompts used were “Help me get started writing a PUT/PATCH project with Project models in mongoDB/mongoose"
The generated code was adopted for PUT/PATCH*/

var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { Project } = require('../db/models');


// GET list of projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        return res.status(200).send(projects);
    } catch (err) {
        return res.status(500).send('Internal Error: ' + err.message);
    }
});

// POST a new project
router.post('/', async (req, res) => {
    const newProject = new Project({ projectID: uuidv4(), ...req.body });
    try {
        await newProject.save();
        return res.status(201).send(newProject);
    } catch (err) {
        return res.status(500).send('Internal Error: ' + err.message);
    }
})

// PUT (edit) a project
router.put('/:id', async (req, res) => {
    try {
        const projectID = req.params.id;
        console.log("Recieved PUT request for projectID", projectID);

        const updatedProject = await Project.findOneAndUpdate(
        { projectID: projectID },
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedProject) {
        return res.status(404).send('Project not found');
      }

      return res.status(200).send(updatedProject);
    } catch (err) {
        return res.status(500).send('Error: ' + err.message);
    }
  });

// PATCH (partial edit) a project
router.patch('/:id', async (req, res) => {
    try {
      const projectID = req.params.id;
      const updatedProject = await Project.findOneAndUpdate(
        { projectID: projectID },
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!updatedProject) {
        return res.status(404).send('Project not found');
      }

      return res.status(200).send(updatedProject);
    } catch (err) {
      return res.status(500).send('Error: ' + err.message);
    }
  });

// DELETE a project
router.delete('/:id', async (req, res) => {
    try {
        const projectID = req.params.id;
        console.log("Received DELETE request for projectID:", projectID);

        const result = await Project.deleteOne({ projectID: projectID });
        if (result.deletedCount === 0) {
            return res.status(404).send('Project not found');
      }
      return res.status(204).send();
    } catch (err) {
        return res.status(500).send('Internal Error: ' + err.message);
    }
  });

module.exports = router;