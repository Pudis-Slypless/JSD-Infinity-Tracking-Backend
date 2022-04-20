const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  activity: {
    type: String,
    minLength: [2, "Activity name should contains at least 2 char"],
  },
  timestamp: { type: Date },
  duration: { type: String, min: [0, "Duration must be at least 0"] },
  distance: { type: Number, min: [0, "Distance must be at least 0"] },
  location: {
    type: String,
    minLength: [3, "Location should contains at least 3 char"],
  },
  description: { type: String },
});

const RecordModel = mongoose.model("Record", recordSchema, "records");

module.exports = RecordModel;
