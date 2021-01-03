const mongoose = require("mongoose");
const { required } = require("../config/mongoDB");
const Description = require("./Description");

// Skill schema
const SkillSchema = new mongoose.Schema(
  {
    type: {
      enum: ["OS", "lang", "tool", "DB"],
    },
    name: {
      type: String,
      required: required("Skill name"),
      unique: true,
      trim: true,
    },
    description: [Description],
    useCase: [Description],
    date: {
      type: Date,
      default: Date.now,
    },
    hold: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// export model
module.exports = mongoose.model("Skill", SkillSchema);
