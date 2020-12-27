const express = require("express");
const path = require("path");
const readEnv = require("./utils/readEnv");
const { connectDB } = require("./config/db");
const logger = require("./utils/logger");

// read enviroment vars
const {
  NODE_NAME,
  NODE_ENV,
  EXPRESS_PORT,
  EXPRESS_URI,
  EXPRESS_ROOT,
  MONGO_URI,
} = readEnv;

// database connection
connectDB(MONGO_URI);

// express server
const app = express();
app.use(express.json());
app.use(require("./routes"));
app.use(require("./middlewares/errorHandler"));

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
