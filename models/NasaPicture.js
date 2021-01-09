// Nasa picture of the day
const mongoose = require("mongoose");
const { required } = require("../config/mongoDB");

// Nasa picture schema
const NasaPictureSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: required("Date"),
      index: true,
    },
    title: {
      type: String,
      required: required("Title"),
      trin: true,
    },
    explanation: {
      type: String,
      required: required("Explanation"),
      trin: true,
    },
    url: {
      type: String,
      required: required("Url"),
      trin: true,
    },
    urlHD: {
      type: String,
      required: required("HD Url"),
      trin: true,
    },
  },
  {
    timestamps: true,
    collection: "nasaPods",
  }
);

// create model
const NasaPicture = mongoose.model("NasaPicture", NasaPictureSchema);

// export
module.exports = NasaPicture;
