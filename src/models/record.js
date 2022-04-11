const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  activityName: {
    type: String,
    minLength: [3, "Activity name should contains at least 3 char"],
  },
  timestamp: { type: Date },
  duration: { type: Number, min: [0, "Duration must be at least 0"] },
  distance: { type: Number, min: [0, "Distance must be at least 0"] },
  location: {
    type: String,
    minLength: [3, "Location should contains at least 3 char"],
  },
  description: { type: String },
});

const RecordModel = mongoose.model("Record", recordSchema, "records");

module.exports = RecordModel;
