const readEnv = require("../utils/readEnv.js");
const sgMail = require("@sendgrid/mail");
const asyncHandler = require("../middlewares/asyncHandler");

// sendgrid settings
const { SEND_GRID_API, SEND_GRID_MAIL_TO } = readEnv;

// send mail
const sendMail = asyncHandler(async (req, res, next) => {
  // set client
  sgMail.setApiKey(SEND_GRID_API);
  // create mail to send
  const msg = {
    to: SEND_GRID_MAIL_TO, // Change to your recipient
    from: "test@example.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  // send email
  await sgMail.send(msg);
  //.then(() => {
  console.log("Email sent");
  //})

  //    .catch(error => {
  //  console.error(error);
  //});
});

module.exports = { sendMail };
