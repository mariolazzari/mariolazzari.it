// Certification router
const router = require("express").Router();
const {
  getSocials,
  getSocial,
  addSocial,
  updateSocial,
  deleteSocial,
} = require("../controllers/socials");
const advancedResults = require("../middlewares/advancedResults");
const Social = require("../models/Social");

// base path
router.route("/").get(advancedResults(Social), getSocials).post(addSocial);
// id parameteter
router.route("/:id").get(getSocial).put(updateSocial).delete(deleteSocial);

// export router
module.exports = router;
