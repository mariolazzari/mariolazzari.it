//const readEnv = require("../utils/readEnv");
const { connectDB } = require("../config/mongoDB");
const fs = require("fs");

// load models
const Skill = require("../models/Skill");
const Social = require("../models/Social");

// read json files
const skills = JSON.parse(fs.readFileSync("./skills.json", "utf-8"));
const socials = JSON.parse(fs.readFileSync("./socials.json", "utf-8"));

// import data
const importData = async () => {
  try {
    await Skill.create(skills);
    console.log("Skills imported.");
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
    await Skill.deleteMany();
    console.log("Skills deleted.");
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
