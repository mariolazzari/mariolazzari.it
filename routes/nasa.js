// Nasa router
const router = require("express").Router();
const { getPictureOfTheDay } = require("../controllers/nasa");
const advancedResults = require("../middlewares/advancedResults");
const NasaPicture = require("../models/NasaPicture");

// Picture of the day
router.route("/pod").get(advancedResults(NasaPicture), getPictureOfTheDay);

// exports
module.exports = router;
