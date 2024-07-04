/* ChatGPT 4.0 June 30 2024
Need a mongodb schema for the following format*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userID: { type: String, required: true, unique: true },
  githubUsername: { type: String, required: true, unique: true },
  ownedProjects: { type: [String], default: [] },
  subscribedProjects: { type: [String], default: [] },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  userImage: { type: String, required: true },
  emailAddress: { type: String, required: false, unique: false },
  preferences: {
    difficultyTags: { type: [String], default: [] },
    techTags: { type: [String], default: [] },
    projectTags: { type: [String], default: [] },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
