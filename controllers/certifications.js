// Certification controller
const asyncHandler = require("../middlewares/asyncHandler");
const Certification = require("../models/Certification");
const { notFound, updateOpts } = require("../utils/mongoDB");

// get all certifications
const getCertifications = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// get certification by ID
const getCertification = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const certification = await Certification.findById(id);
  if (!certification) {
    return next(notFound("Certification", id));
  }
  res.status(200).json({ certification });
});

// add new certification
const addCertification = asyncHandler(async (req, res, next) => {
  const certification = await Certification.create(req.body);
  res.status(201).json({ certification });
});

// update existing certification
const updateCertification = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const certification = await Certification.findByIdAndUpdate(
    id,
    req.body,
    updateOpts
  );
  if (!certification) {
    return next(notFound("Certification", id));
  }
  res.status(200).json({ certification });
});

// delete existing certification
const deleteCertification = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const certification = await Certification.findByIdAndDelete(id);
  if (!certification) {
    return next(notFound("Certification", id));
  }
  res.status(200).json({ certification });
});

// exports
module.exports = {
  getCertifications,
  getCertification,
  addCertification,
  updateCertification,
  deleteCertification,
};
