// Nasa picture of the day
const mongoose = require("mongoose");
const { required } = require("../config/mongoDB");

// Nasa picture schema
const NasaPictureSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: required("Date"),
    },
    title: {
      type: String,
      required: required("Title"),
      trin: true,
    },
    explanation: {
      type: String,
      trin: true,
    },
    media_type: {
      type: String,
    },
    url: {
      type: String,
      trin: true,
    },
  },
  {
    timestamps: true,
    collection: "nasaPods",
  }
);

// indexes
NasaPictureSchema.index({ date: -1 });
NasaPictureSchema.index({ title: "text" }, { explanation: "text" });

// create model
const NasaPicture = mongoose.model("NasaPicture", NasaPictureSchema);

// export
module.exports = NasaPicture;
