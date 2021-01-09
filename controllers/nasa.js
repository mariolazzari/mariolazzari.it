// Nasa API
const NasaPicture = require("../models/NasaPicture");
const axios = require("axios");
const asyncHandler = require("../middlewares/asyncHandler");
const readEnv = require("../utils/readEnv");

const { NASA_API_KEY } = readEnv;

// Picture of the day
const getPictureOfTheDay = asyncHandler(async (req, res, next) => {
  const test = await NasaPicture.find();
  /* 
 const { query } = req;
  let api = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

  // return random n images
  if (query.count) {
    api += `&count=${query.count}`;
  } else if (query.startDay) {
    api += `&start_day=${query.startDay}&&endDate=${query.endDate}`;
  }

  const { data } = await axios.get(api);

  res.status(200).json({ data, query, api });
  */

  res.json({ message: "wip", test });
});

// export
module.exports = { getPictureOfTheDay };
