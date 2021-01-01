const mongoose = require("mongoose");
const { required } = require("../config/db");

// Skill schema
const SkillSchema = new mongoose.Schema({
  type: {
    enum: ["OS", "lang", "tool", "DB"],
  },
  name: {
    type: String,
    required: required("Skill name"),
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  useCase: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  hold: {
    type: Boolean,
    default: false,
  },
  remarks: {
    type: String,
    trim: true,
  },
});

// export model
module.exports = mongoose.model("Skill", SkillSchema);
