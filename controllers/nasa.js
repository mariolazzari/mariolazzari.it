// Nasa API
const NasaPicture = require("../models/NasaPicture");
const asyncHandler = require("../middlewares/asyncHandler");
const { format } = require("date-fns");

// Picture of the day
const getPictureOfTheDay = asyncHandler(async (req, res, next) => {
  // check if today pic is available
  const today = await NasaPicture.findOne({
    date: format(new Date(), "yyyy-MM-dd"),
  });

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
