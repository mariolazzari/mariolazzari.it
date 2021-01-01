// Skill controller
const asyncHandler = require("../middlewares/asyncHandler");
const Social = require("../models/Social");
const { notFound, updateOpts } = require("../config/mongoDB");

// get all social accounts
const getSocials = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// get social account by ID
const getSocial = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const social = await Social.findById(id);
  if (!social) {
    return next(notFound("Social account", id));
  }
  res.status(200).json({ social });
});

// add new social account
const addSocial = asyncHandler(async (req, res, next) => {
  const socail = await Social.create(req.body);
  res.status(201).json({ social });
});

// update existing social account
const updateSocial = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const social = await Social.findByIdAndUpdate(id, req.body, updateOpts);
  if (!social) {
    return next(notFound("Social account", id));
  }
  res.status(200).json({ social });
});

// delete existing social account
const deleteSocial = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const social = await Social.findByIdAndDelete(id);
  if (!social) {
    return next(notFound("Social account", id));
  }
  res.status(200).json({ social });
});

// exports
module.exports = {
  getSocials,
  getSocial,
  addSocial,
  updateSocial,
  deleteSocial,
};
