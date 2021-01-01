// Certification router
const router = require("express").Router();
const {
  getSkills,
  getSkill,
  addSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skills");
const advancedResults = require("../middlewares/advancedResults");
const Skill = require("../models/Skill");

// base path
router.route("/").get(advancedResults(Skill), getSkills).post(addSkill);
// id parameteter
router.route("/:id").get(getSkill).put(updateSkill).delete(deleteSkill);

// export router
module.exports = router;
