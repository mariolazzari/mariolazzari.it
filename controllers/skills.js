// Skill controller
const asyncHandler = require("../middlewares/asyncHandler");
const Skill = require("../models/Skill");
const { notFound, updateOpts } = require("../config/mongoDB");

// get all skills
const getSkills = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// get skill by ID
const getSkill = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const skill = await Skill.findById(id);
  if (!skill) {
    return next(notFound("Skill", id));
  }
  res.status(200).json({ skill });
});

// add new skill
const addSkill = asyncHandler(async (req, res, next) => {
  const skill = await Skill.create(req.body);
  res.status(201).json({ skill });
});

// update existing skill
const updateSkill = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const skill = await Skill.findByIdAndUpdate(id, req.body, updateOpts);
  if (!skill) {
    return next(notFound("Skill", id));
  }
  res.status(200).json({ skill });
});

// delete existing skill
const deleteSkill = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const skill = await Certification.findByIdAndDelete(id);
  if (!skill) {
    return next(notFound("Skill", id));
  }
  res.status(200).json({ skill });
});

// exports
module.exports = {
  getSkills,
  getSkill,
  addSkill,
  updateSkill,
  deleteSkill,
};
