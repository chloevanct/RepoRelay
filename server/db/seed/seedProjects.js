const mongoose = require('mongoose');
const Project = require('../models/project');
const seedProjectData = require('./seedProjectData');
const connectDB = require("../connection");
require('dotenv').config();

// Resets the projects in the database to the seedProjectData
async function seedProjects() {
  try {
    await connectDB();

    await Project.deleteMany({});

    await Project.insertMany(seedProjectData);

    console.log('Database projects seeded successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding the database:', err);
    mongoose.connection.close();
  }
}

seedProjects();