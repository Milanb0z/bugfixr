const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Joi = require("joi");

const userSchema = mongoose.Schema({
  username: {
    unique: true,
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  bio: {
    required: true,
    type: String,
    default: "404 Bio Not Found",
  },
  password: {
    required: true,
    type: String,
  },
  date_joined: {
    type: Date,
    default: Date.now,
  },
  isVerified: { type: Boolean, default: false },
});

userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret.password;
    delete ret._id;
    delete ret.__v;
  },
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

userSchema.methods.hashPassword = async function (password) {
  try {
    return await bcrypt.hash(password, 10);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const userValidatonSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  bio: Joi.string().max(1000).required(),
});

const User = new mongoose.model("User", userSchema);

module.exports = { User, userValidatonSchema };
