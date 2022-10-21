// Social model
const mongoose = require("mongoose");
const { required } = require("../utils/mongoDB");

// Social schema
const SocialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: required("Social name"),
      unique: true,
      trim: true,
    },
    url: {
      type: String,
      required: required("Social name"),
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// export model
module.exports = mongoose.model("Social", SocialSchema);
