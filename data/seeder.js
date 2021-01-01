//const readEnv = require("../utils/readEnv");
const { connectDB } = require("../config/mongoDB");
const fs = require("fs");

// load models
const Social = require("../models/Social");

// read json files
const socials = JSON.parse(fs.readFileSync("./socials.json", "utf-8"));

// import data
const importData = async () => {
  try {
    await Social.create(socials);
    console.log("Socials imported.");
  } catch (ex) {
    console.log("Error while importing data:", ex.message);
    process.exit(1);
  }
};

// delete data from mongo db
const deleteData = async () => {
  try {
    await Social.deleteMany();
    console.log("Socials deleted.");
  } catch (ex) {
    console.log(ex.message);
    process.exit(1);
  }
};

// execution
(async () => {
  await connectDB();
  await deleteData();
  await importData();
  process.exit(0);
})();
