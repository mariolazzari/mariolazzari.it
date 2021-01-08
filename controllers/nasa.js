// Nasa API
const axios = require("axios");
const asyncHandler = require("../middlewares/asyncHandler");
const readEnv = require("../utils/readEnv");

const { NASA_API_KEY } = readEnv;

// Picture of the day
const getPictureOfTheDay = asyncHandler(async (req, res, next) => {
  const { query } = req;

  const api = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

  const { data } = await axios.get(api);

  res.status(200).json({ data, query });
});

// export
module.exports = { getPictureOfTheDay };
