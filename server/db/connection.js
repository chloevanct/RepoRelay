/* June 25 2024
Referenced mongoose docs for the below code 'Getting Started'
https://mongoosejs.com/docs/*/

/* ChatGPT 4.0 June 25 2024
Prompts used were “Help me get started on how to organize setting up mongoDB with server"
The generated code was adopted*/

const mongoose = require("mongoose");
console.log("starting mongo");
const connectDB = async () => {
  try {
    console.log(process.env.DB_CONNECTION);
    await mongoose.connect(process.env.DB_CONNECTION);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
