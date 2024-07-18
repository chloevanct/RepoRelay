/* Adapted following MongoDB tutorial
 Accessed June 17 2024 - https://www.mongodb.com/resources/languages/express-mongodb-rest-api-tutorial */

/* ChatGPT 4.0 June 27 2024
Prompts used were “Help me get started writing a PUT/PATCH project with Project models in mongoDB/mongoose"
The generated code was adopted for PUT/PATCH*/

var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { Project } = require("../db/models");

const User = require("../db/models/user");

// ! projects are found by ProjectID (as per group meeting to not break front end)
// therefore we use findOne({ projectID: projectID })
// ! tasks and comments are found by _id (mongodb's allocated id)
// therefore we use tasks.id(taskID), comments.id(commentID)

/* ------------------------------ projects ------------------------------ */
// GET list of projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    return res.status(200).send(projects);
  } catch (err) {
    return res.status(500).send("Internal Error: " + err.message);
  }
});

// GET a project by projectID
router.get("/:id", async (req, res) => {
  try {
    const projectID = req.params.id;
    const project = await Project.findOne({ projectID: projectID });
    if (!project) {
      return res.status(404).send("Project not found");
    }
    return res.status(200).send(project);
  } catch (err) {
    return res.status(500).send("Internal Error: " + err.message);
  }
});

// POST a new project
router.post("/", async (req, res) => {
  const newProject = new Project({ projectID: uuidv4(), ...req.body });

  const ownerID = newProject.projectOwner;

  const user = await User.findOneAndUpdate(
    { userID: ownerID },
    { $push: { ownedProjects: newProject.projectID } },
    { new: true }
  );

  if (!user) {
    return res.status(404).send("User not found");
  }

  console.log(req.body);
  try {
    await newProject.save();
    return res.status(201).send(newProject);
  } catch (err) {
    return res.status(500).send("Internal Error: " + err.message);
  }
});

// PUT (edit) a project
router.put("/:id", async (req, res) => {
  try {
    const projectID = req.params.id;
    console.log("Recieved PUT request for projectID", projectID);

    const updatedProject = await Project.findOneAndUpdate(
      { projectID: projectID },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).send("Project not found");
    }

    return res.status(200).send(updatedProject);
  } catch (err) {
    return res.status(500).send("Error: " + err.message);
  }
});

// PATCH (partial edit) a project
router.patch("/:id", async (req, res) => {
  try {
    const projectID = req.params.id;
    const updatedProject = await Project.findOneAndUpdate(
      { projectID: projectID },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).send("Project not found");
    }

    return res.status(200).send(updatedProject);
  } catch (err) {
    return res.status(500).send("Error: " + err.message);
  }
});

// DELETE a project
router.delete("/:id", async (req, res) => {
  try {
    const projectID = req.params.id;
    console.log("Received DELETE request for projectID:", projectID);

    const result = await Project.deleteOne({ projectID: projectID });
    if (result.deletedCount === 0) {
      return res.status(404).send("Project not found");
    }
    return res.status(204).send();
  } catch (err) {
    return res.status(500).send("Internal Error: " + err.message);
  }
});

/* ------------------------------ tasks ------------------------------ */
// GET list of all tasks in a project
router.get("/:projectID/tasks", async (req, res) => {
  try {
    const projectID = req.params.projectID;
    const project = await Project.findOne({ projectID: projectID });
    if (!project) {
      return res.status(404).send("Project not found");
    }
    return res.status(200).send(project.tasks);
  } catch (err) {
    return res.status(500).send("Internal Error: " + err.message);
  }
});

// GET a specific task in a project
router.get("/:projectID/tasks/:taskID", async (req, res) => {
  try {
    const projectID = req.params.projectID;
    const project = await Project.findOne({ projectID: projectID });
    if (!project) {
      return res.status(404).send("Project not found");
    }
    const taskID = req.params.taskID;
    const task = project.tasks.id(taskID);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.status(200).send(task);
  } catch (err) {
    return res.status(500).send("Internal Error: " + err.message);
  }
});

// POST a new task to a project
router.post('/:projectID/tasks', async (req, res) => {
  try {
      const projectID = req.params.projectID;
      const project = await Project.findOne({ projectID: projectID });
      if (!project) {
        return res.status(404).send('Project not found');
      }
      project.tasks.push(req.body);
      await project.save();
      res.status(201).send(project);
  } catch (err) {
    return res.status(500).send("Internal Error: " + err.message);
  }
});

// PUT (edit) a task in a project
router.put("/:projectID/tasks/:taskID", async (req, res) => {
  try {
    const projectID = req.params.projectID;
    const project = await Project.findOne({ projectID: projectID });
    if (!project) {
      return res.status(404).send("Project not found");
    }
    const taskID = req.params.taskID;
    const task = project.tasks.id(taskID);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    task.set(req.body);
    await project.save();
    res.status(200).send(project);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

// PATCH (partial edit) a task in a project
router.patch("/:projectID/tasks/:taskID", async (req, res) => {
  try {
    const projectID = req.params.projectID;
    const project = await Project.findOne({ projectID: projectID });
    if (!project) {
      return res.status(404).send("Project not found");
    }
    const taskID = req.params.taskID;
    const task = project.tasks.id(taskID);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    Object.assign(task, req.body);
    await project.save();
    res.status(200).send(project);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

// DELETE a task from a project
router.delete("/:projectID/tasks/:taskID", async (req, res) => {
  try {
    const projectID = req.params.projectID;
    const project = await Project.findOne({ projectID: projectID });
    if (!project) {
      return res.status(404).send("Project not found");
    }
    const taskID = req.params.taskID;
    const task = project.tasks.id(taskID);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    project.tasks.pull(taskID);
    await project.save();
    res.status(204).send();
  } catch (err) {
    return res.status(500).send("Internal Error: " + err.message);
  }
});

/* ------------------------------ comments ------------------------------ */
// GET list of all comments in a project
router.get("/:projectID/comments", async (req, res) => {
  try {
    const projectID = req.params.projectID;
    const project = await Project.findOne({ projectID: projectID });
    if (!project) {
      return res.status(404).send("Project not found");
    }
    return res.status(200).send(project.comments);
  } catch (err) {
    return res.status(500).send("Internal Error: " + err.message);
  }
});

// GET a specific comment in a project
router.get("/:projectID/comments/:commentID", async (req, res) => {
  try {
    const projectID = req.params.projectID;
    const project = await Project.findOne({ projectID: projectID });
    if (!project) {
      return res.status(404).send("Project not found");
    }
    const commentID = req.params.commentID;
    const comment = project.comments.id(commentID);
    if (!comment) {
      return res.status(404).send("Comment not found");
    }
    res.status(200).send(comment);
  } catch (err) {
    return res.status(500).send("Internal Error: " + err.message);
  }
});

// POST a new comment to a project
router.post('/:projectID/comments', async (req, res) => {
try {
    const projectID = req.params.projectID;
    const project = await Project.findOne({ projectID: projectID });
    if (!project) {
      return res.status(404).send("Project not found");
    }
    const newComment = {
      postedBy: req.body.postedBy,
      commenterProfileImage: req.body.commenterProfileImage,
      datePosted: req.body.datePosted,
      commentBody: req.body.commentBody
  };
    project.comments.push(newComment);
    await project.save();
    res.status(201).send(project);
  } catch (err) {
    return res.status(500).send("Internal Error: " + err.message);
  }
});

// PUT (edit) a comment in a project
router.put("/:projectID/comments/:commentID", async (req, res) => {
  try {
    const projectID = req.params.projectID;
    const project = await Project.findOne({ projectID: projectID });
    if (!project) {
      return res.status(404).send("Project not found");
    }
    const commentID = req.params.commentID;
    const comment = project.comments.id(commentID);
    if (!comment) {
      return res.status(404).send("Comment not found");
    }
    comment.set(req.body);
    await project.save();
    res.status(200).send(project);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

// PATCH (partial edit) a comment in a project
router.patch("/:projectID/comments/:commentID", async (req, res) => {
  try {
    const projectID = req.params.projectID;
    const project = await Project.findOne({ projectID: projectID });
    if (!project) {
      return res.status(404).send("Project not found");
    }
    const commentID = req.params.commentID;
    const comment = project.comments.id(commentID);
    if (!comment) {
      return res.status(404).send("Comment not found");
    }
    Object.assign(comment, req.body);
    await project.save();
    res.status(200).send(project);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

// DELETE a comment from a project
router.delete("/:projectID/comments/:commentID", async (req, res) => {
  try {
    const projectID = req.params.projectID;
    const project = await Project.findOne({ projectID: projectID });
    if (!project) {
      return res.status(404).send("Project not found");
    }
    const commentID = req.params.commentID;
    const comment = project.comments.id(commentID);
    if (!comment) {
      return res.status(404).send("Comment not found");
    }
    project.comments.pull(commentID);
    await project.save();
    res.status(204).send();
  } catch (err) {
    return res.status(500).send("Internal Error: " + err.message);
  }
});

module.exports = router;
