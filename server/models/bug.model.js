const mongoose = require("mongoose");

const bugSchema = mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: false,
    type: String,
  },
});

const Bug = new mongoose.model("Bug", bugSchema);

module.exports = Bug;
