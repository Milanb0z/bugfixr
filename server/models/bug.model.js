const mongoose = require("mongoose");

const bugSchema = mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  bug_id: {
    type: Number,
    required: true,
    default: 0,
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

bugSchema.pre("save", async function (next) {
  try {
    console.log(":xsd");
    let bug_id = 1;
    const higgestIndex = await Bug.findOne().sort("-bug_id");
    console.log(higgestIndex);
    if (higgestIndex) {
      bug_id = higgestIndex.bug_id + 1;
    }

    this.bug_id = bug_id;

    next();
  } catch (error) {
    console.error(error);
    throw new Error({ error });
  }
});

const Bug = new mongoose.model("Bug", bugSchema);

module.exports = Bug;
