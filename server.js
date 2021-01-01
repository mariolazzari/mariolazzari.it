const express = require("express");
const path = require("path");
const readEnv = require("./utils/readEnv");
const { connectDB } = require("./config/mongoDB");
const logger = require("./utils/logger");
const morgan = require("morgan");
const compression = require("compression");

// read enviroment vars
const {
  NODE_NAME,
  NODE_ENV,
  EXPRESS_PORT,
  EXPRESS_URI,
  EXPRESS_ROOT,
} = readEnv;

// database connection
connectDB();

// express server
const app = express();
app.use(compression());
app.use(express.json());

// log api call in dev mode only
if (NODE_ENV === "dev") {
  app.use(morgan("tiny"));
}

// express routes
app.use(require("./routes"));
app.use(require("./middlewares/errorHandler"));
// static routes
app.use("/uploads", express.static(__dirname + "/uploads"));
// serve react client in production mode
if (NODE_ENV === "prod") {
  // react index path
  const indexPath = path.join(__dirname, EXPRESS_ROOT, "index.html");
  // add static route in order to serve react index path
  app.use(express.static(EXPRESS_ROOT));
  app.get("*", (req, res) => res.sendFile(indexPath));
  logger.info(`React client started on ${indexPath}.`);
}

app.listen(3001, () =>
  logger.info(
    `${NODE_NAME} started on ${EXPRESS_URI}:${EXPRESS_PORT} in '${NODE_ENV}' mode.`
  )
);
