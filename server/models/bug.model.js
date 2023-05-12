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
  date_opened: {
    type: Date,
    default: Date.now(),
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  author: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

bugSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const Bug = new mongoose.model("Bug", bugSchema);

module.exports = Bug;
