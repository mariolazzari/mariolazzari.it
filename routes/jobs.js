// Certification router
const router = require("express").Router();
const {
  getJobs,
  //getSkill,
  //addSkill,
  //updateSkill,
  //deleteSkill,
} = require("../controllers/jobs");
const advancedResults = require("../middlewares/advancedResults");
const Job = require("../models/Job");

// base path
router.route("/").get(advancedResults(Job), getJobs);
// id parameteter
//router.route("/:id").get(getSkill).put(updateSkill).delete(deleteSkill);

// export router
module.exports = router;
