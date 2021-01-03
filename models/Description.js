const mongoose = require("mongoose");
const { required } = require("../config/mongoDB");

// Description schema
const DescriptionSchema = new mongoose.Schema(
  {
    locale: {
      type: String,
      enum: ["en", "it"],
    },
    text: {
      type: String,
      required: required("Description"),
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// export schema
module.exports = DescriptionSchema;
