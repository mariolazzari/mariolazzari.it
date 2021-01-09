// Nasa router
const router = require("express").Router();
const { getPictureOfTheDay } = require("../controllers/nasa");

// Picture of the day
router.get("/pod", getPictureOfTheDay);

// exports
module.exports = router;
