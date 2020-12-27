// Certification router
const router = require("express").Router();
const { getCertifications } = require("../controllers/certifications");
const advancedResults = require("../middlewares/advancedResults");
const Certification = require("../models/Certification");

router.route("/").get(advancedResults(Certification), getCertifications);

// export router
module.exports = router;
