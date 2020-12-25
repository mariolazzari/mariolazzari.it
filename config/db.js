const mongoose = require("mongoose");
const logger = require("../utils/logger");

// connection options
const OPTS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// connect to MongoDB
const connectDB = async uri => {
  try {
    await mongoose.connect(uri, OPTS);
    logger.info(`MongoDB connected to ${uri}.`);
  } catch (ex) {
    logger.error(`Error while connecting to ${MONGO_URI}:`, ex.message);
  }
};

// exports
module.exports = { connectDB };
