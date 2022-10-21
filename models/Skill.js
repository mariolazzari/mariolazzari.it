const mongoose = require("mongoose");
const { required } = require("../utils/mongoDB");
const Description = require("./Description");

// Skill schema
const SkillSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["os", "lang", "ide", "lib", "db"],
    },
    name: {
      type: String,
      required: required("Skill name"),
      unique: true,
      trim: true,
    },
    imagePath: {
      type: String,
    },
    url: {
      type: String,
    },
    description: [Description],
    useCase: [Description],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// export model
module.exports = mongoose.model("Skill", SkillSchema);
