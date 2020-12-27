// Certification model
const mongoose = require("mongoose");
const { required } = require("../config/db");

// Certification schema
const CertificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: required("Title"),
      unique: true,
      trimm: true,
    },
    date: {
      type: Date,
      default: new Date(),
      required: required("Date"),
    },
    url: {
      type: String,
      required: required("Url"),
      trim: true,
    },
    imagePath: {
      type: String,
      default: "",
    },
    review_EN: {
      type: String,
      default: "",
      trim: true,
    },
    review_IT: {
      type: String,
      default: "",
      trim: true,
    },
    remarks: {
      type: String,
      trim: true,
    },
    hold: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// descending date index
CertificationSchema.index({ date: -1, title: 1 });

// export model
module.exports = mongoose.model("Certification", CertificationSchema);