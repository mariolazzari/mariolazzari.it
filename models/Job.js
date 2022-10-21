const mongoose = require("mongoose");
const { required } = require("../utils/mongoDB");
const Description = require("./Description");

// Job schema
const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: required("Company name"),
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
module.exports = mongoose.model("Job", JobSchema);
