// Certification controller
const asyncHandler = require("../middlewares/asyncHandler");
const Certification = require("../models/Certification");

// get all certifications
const getCertifications = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// exports
module.exports = { getCertifications };
