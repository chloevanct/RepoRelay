const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// schema
const taskSchema = new Schema({
    postedBy: { type: String, required: true },
    datePosted: { type: Date, default: Date.now },
    taskBody: { type: String, required: true },
    taskStatus: { type: String, enum: ['open', 'pending', 'completed'], required: true }
  });

  // model
  const Task = model('Task', taskSchema);

  module.exports = Task;