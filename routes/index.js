const router = require("express").Router();
const fs = require("fs");
const path = require("path");

// route file extension
const JS = ".js";

// find route files and remove index.js
const routes = fs.readdirSync("./routes").filter(r => r !== "index.js");
routes.forEach(route => {
  // add router files only
  let file = "";
  if (path.extname(route) === JS) {
    file = path.basename(route, JS);
    router.use(`/api/${file}`, require(`./${file}`));
  }
});

module.exports = router;
