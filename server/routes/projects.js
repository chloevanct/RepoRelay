// Adapted following MongoDB tutorial
// Accessed June 17 2024 - https://www.mongodb.com/resources/languages/express-mongodb-rest-api-tutorial

// !!! ALL PSEUDO CODE !!!

var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

// !!! send as .json or keep as .send
// GET list of projects
router.get("/", async (req, res) => {
    try {
        const projects = await db.projects("projects");
        const results = await projects.find({})
            .toArray();
        res.status(200).send(results);
    } catch (err) {
        res.status(500).send('Internal Server Error: ' + err.message);
    }
});

// POST a new project
router.post("/", async (req, res) => {
    try {
        const projects = await db.projects("projects");
        const newProject = req.body
        newProject.date = new Date();
        const result = await projects.insertOne(newProject);
        res.status(201).send(result);
    } catch (err) {
        res.status(500).send('Internal Server Error: ' + err.message);
    }
})

// PATCH (edit) a project
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: ObjectID(req.params.id) };
        const updates = {
            $push: { projects: req.body }
        };
        const projects = await db.projects("projects");
        const result = await projects.updateOne(query, updates);
        if (!result) {
            return res.status(404).send('Project not found');
          }
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Internal Server Error: ' + err.message);
    }

})

// DELETE a project
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: ObjectID(req.params.id) };
        const projects = db.projects("projects");
        let result = await projects.deleteOne(query);
        if (!result) {
            return res.status(404).send('Project not found');
          }
        res.status(204).send();
    } catch (err) {
        res.status(500).send('Internal Server Error: ' + err.message);
    }
})

module.exports = router;