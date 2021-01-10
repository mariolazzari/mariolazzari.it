// Scheduler
const readEnv = require("./utils/readEnv");
const cron = require("node-cron");
const axios = require("axios");
const { format } = require("date-fns");
const NasaPicture = require("./models/NasaPicture");
const logger = require("./utils/logger");

// get nasa picture of the day
const getNasaPod = async () => {
  try {
    const { NASA_API_KEY } = readEnv;
    // check if today pic is available
    let today = await NasaPicture.findOne({
      date: format(new Date(), "yyyy-MM-dd"),
    });

    if (today) {
      logger.info("Nasa today pciture already present:", today.title);
    } else {
      const { data } = await axios.get(
        "https://api.nasa.gov/planetary/apod?api_key=" + NASA_API_KEY
      );
      // insert today picture if not foud
      if (data) {
        today = new NasaPicture(data);
        await today.save();
        logger.info("Nasa today picture inserted:" + today.title);
      }
    }
  } catch (ex) {
    logger.error(ex.message);
  }
};

// check nasa pod every hour
const nasaPodTask = cron.schedule("0 0 * * * *", () => {
  getNasaPod();
});

// start jobs
const startJobs = () => {
  console.log("object");
  nasaPodTask.start();
};

// exports
module.exports = { startJobs };
