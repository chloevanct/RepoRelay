const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const taskSchema = require('./task').schema;
const commentSchema = require('./comment').schema;

// schema
const projectSchema = new Schema({
    projectID: { type: String, required: true, unique: true },
    projectName: { type: String, required: true },
    projectDescription: { type: String, required: true },
    projectImgURL: { type: String },
    githubURL: { type: String, required: true},
    projectOwner: { type: String, required: true },
    pastContributors: { type: [String], default: [] },
    subscribedUsers: { type: [String], default: [] },
    postedDate: { type: Date, default: Date.now },
    lastActivityDate: { type: Date },
    difficultyTag: { type: String, required: true },
    projectTags: { type: [String], default: [] },
    techTags: { type: [String], default: [] },
    tasks: { type: [taskSchema], default: [] },
    comments: { type: [commentSchema], default: [] }
  });

// model
const Project = model('Project', projectSchema);

module.exports = Project;
