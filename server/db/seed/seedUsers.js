const mongoose = require('mongoose');
const User = require('../models/user');
const seedUserData = require('./seedUserData');
const connectDB = require("../connection");
require('dotenv').config();

// Resets the projects in the database to the seedData
async function seedProjects() {
  try {
    await connectDB();

    await User.deleteMany({});

    await User.insertMany(seedUserData);

    console.log('Database users seeded successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding the database:', err);
    mongoose.connection.close();
  }
}

seedProjects();