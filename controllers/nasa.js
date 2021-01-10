// Nasa API
const NasaPicture = require("../models/NasaPicture");
const axios = require("axios");
const asyncHandler = require("../middlewares/asyncHandler");
const readEnv = require("../utils/readEnv");
const { format } = require("date-fns");

const { NASA_API_KEY } = readEnv;

// Picture of the day
const getPictureOfTheDay = asyncHandler(async (req, res, next) => {
  // check if today pic is available
  let today = await NasaPicture.findOne({
    date: format(new Date(), "yyyy-MM-dd"),
  });

  // insert today picture if not foud
  /*
  if (!today) {
    const { data } = await axios.get(
      "https://api.nasa.gov/planetary/apod?api_key=" + NASA_API_KEY
    );

  
    if (data) {
      today = new NasaPicture(data);
      await today.save();
    }
  }
*/

  // serach pictures by keywords
  const { query } = req;
  let pods = [];
  if (query.search) {
    pods = await NasaPicture.find({ $text: { $search: query.search } }).sort({
      date: -1,
    });
  }

  res.json({ today, pods });
});

// export
module.exports = { getPictureOfTheDay };
