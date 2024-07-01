const mongoose = require('mongoose');
const Project = require('./model/project'); // TODO: post project schema
const seedData = require('./seedData');

// Resets the projects in the database to the seedData
async function seedProjects() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);

    await Project.deleteMany({});

    await Project.insertMany(seedData.projects);

    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding the database:', err);
    mongoose.connection.close();
  }
}

seedProjects();