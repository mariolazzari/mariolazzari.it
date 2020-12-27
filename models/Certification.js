// Certification model
const mongoose = require("mongoose");

// Certification schema
const CertificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trimm: true,
    },
    date: {
      type: Date,
      default: new Date(),
      required: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    imagePath: {
      type: String,
      default: "",
    },
    review: {
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
