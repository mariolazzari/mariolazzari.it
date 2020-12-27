// Certification router
const router = require("express").Router();
const {
  getCertifications,
  getCertification,
  addCertification,
  updateCertification,
  deleteCertification,
} = require("../controllers/certifications");
const advancedResults = require("../middlewares/advancedResults");
const Certification = require("../models/Certification");

// base path
router
  .route("/")
  .get(advancedResults(Certification), getCertifications)
  .post(addCertification);
// id parameteter
router
  .route("/:id")
  .get(getCertification)
  .put(updateCertification)
  .delete(deleteCertification);

// export router
module.exports = router;
