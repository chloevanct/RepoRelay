const mongoose = require('mongoose');
const Project = require('../models/project');
const seedData = require('./seedProjectData');
const connectDB = require("../connection");
require('dotenv').config();

// Resets the projects in the database to the seedData
async function seedProjects() {
  try {
    await connectDB();

    await Project.deleteMany({});

    await Project.insertMany(seedData);

    console.log('Database projects seeded successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding the database:', err);
    mongoose.connection.close();
  }
}

seedProjects();