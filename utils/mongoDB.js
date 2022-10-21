const mongoose = require("mongoose");
const readEnv = require("./readEnv");
const ErrorResponse = require("./ErrorResponse");
const logger = require("./logger");

// read env settings
const { MONGO_URI, NODE_ENV } = readEnv;

// connect to server
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    // set debug in dev mode only
    mongoose.set("debug", NODE_ENV === "dev");
    logger.info(`MongoDB succesfully connected to ${MONGO_URI}.`);
  } catch (ex) {
    logger.error(`MongoDB connection error: ${ex.message}.`);
  }
};

// update options
const updateOpts = {
  new: true,
  runValidators: true,
};

// build required message for entity
const required = (entity, message = "is mandatory") => [
  true,
  `${entity} ${message}`,
];

// Customer group not found
const notFound = (entity, id) =>
  new ErrorResponse(`${entity} not found with id '${id}'.`, 404);

// check date format
const checkDate = date => {
  const test = new Date(date);
  return test != "Invalid Date";
};

// exports
module.exports = { connectDB, updateOpts, required, notFound, checkDate };
