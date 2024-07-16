const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// schema
const commentSchema = new Schema({
    postedBy: { type: String, required: true },
    commenterProfileImage: { type: String },
    datePosted: { type: Date, default: Date.now },
    commentBody: { type: String, required: true }
  });

// model
const Comment = model('Comment', commentSchema);

module.exports = Comment;