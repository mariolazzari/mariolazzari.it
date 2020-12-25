// Logger
const { createLogger, format, transports } = require("winston");
const path = require("path");

// enable daily rotate
require("winston-daily-rotate-file");

const {
  NODE_ENV,
  NODE_NAME,
  LOG_PATH,
  LOG_MAX_SIZE,
  LOG_MAX_FILES,
} = process.env;
const datePattern = "YYYY-MM-DD";
const timeStamp = "HH:mm:ss";

// log format
const logFormat = ({ timestamp, level, label, message }) =>
  `${timestamp} - ${level} [${label}]: ${message}`;

// logger settings
const logger = createLogger({
  // change level if in dev environment versus production
  level: NODE_ENV === "dev" ? "debug" : "info",
  format: format.combine(
    format.label({ label: NODE_NAME }),
    format.timestamp({ format: timeStamp })
  ),
  transports: [
    // error file
    new transports.DailyRotateFile({
      level: "error",
      filename: path.join(LOG_PATH, "%DATE%_err.log"),
      format: format.combine(format.printf(logFormat)),
      datePattern,
      maxSize: LOG_MAX_SIZE,
      maxFiles: LOG_MAX_FILES,
    }),

    // logs file
    new transports.DailyRotateFile({
      filename: path.join(LOG_PATH, "%DATE%_all.log"),
      format: format.combine(format.printf(logFormat)),
      datePattern,
      maxSize: LOG_MAX_SIZE,
      maxFiles: LOG_MAX_FILES,
    }),
  ],
});

// add console logging in dev mode only
if (NODE_ENV === "dev") {
  logger.add(
    new transports.Console({
      handleExceptions: true,
      humanReadableUnhandledException: true,
      format: format.combine(format.colorize(), format.printf(logFormat)),
    })
  );
}

// export logger
module.exports = logger;
