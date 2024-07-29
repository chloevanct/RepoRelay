const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recommendationSchema = new Schema({
  userID: { type: String, required: true, unique: true },
  recommendations: { type: [String], required: true },
});

const Recommendation = mongoose.model("Recommendation", recommendationSchema);

module.exports = Recommendation;
