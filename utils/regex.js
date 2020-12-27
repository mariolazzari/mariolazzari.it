// mongo operator regex
const mongoOps = /\b(gt|gte|lt|lte|in)/gi;

// email
const mailRegex = [
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
  "Email address is not valid.",
];

// web site
const siteRegex = [
  /(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  "Site address is not valid.",
];

module.exports = {
  mailRegex,
  mongoOps,
  siteRegex,
};
