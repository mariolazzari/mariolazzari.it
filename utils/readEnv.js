// Read enviroment vars
const dotenv = require("dotenv");
const appRoot = require("app-root-path");

// application root path
const rootPath = appRoot.path;

// read vars anche check for errors
const config = dotenv.config({ path: `${appRoot}/config/config.env` });
if (config.error) {
  console.error(config.error);
  throw config.error;
}

// check node enviromwnt
let { NODE_ENV } = process.env;
if (NODE_ENV !== "dev") {
  NODE_ENV = "prod";
}

// export enviroment vars
module.exports = {
  ...config.parsed,
  NODE_ENV,
  ROOT_PATH: rootPath,
};
