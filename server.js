let express = require("express");
let http = require("http");
let FormData = require("form-data");
let cors = require("cors");
let Mailgun = require("mailgun.js");
const mailgun = new Mailgun(FormData);
const DOMAIN = "studyspaceowner.me";
const mg = mailgun.client({
  username: "api",
  key: "1f131cddc03280f13232b2af9b68a18e-063062da-de47c94f",
});

const sendMail = async (email) => {
  let random = Math.floor(Math.random() * 123);
  const messageData = {
    from: `StudySpace <noreply@${DOMAIN}>`,
    to: email,
    subject: "Known Verification😃😄😃",
    text: "she's just opened! " + random,
  };
  try {
    const data = await mg.messages.create(DOMAIN, messageData);
    console.log("data: " + data);
    return {
      error: data,
      success: true,
    };
  } catch (err) {
    return {
      error: JSON.stringify(err),
      success: false,
    };
  }
};
let app = express();
app.use(cors());
let server = http.createServer(app);

app.get("/send/:email", async (req, res) => {
  const email = req.params.email;
  let data = await sendMail(email);
  return res.status(200).json({
    success: true,
    msg: "email delivered!",
  });
});
app.get("/", (req, res) => res.send("working!!!"));

server.listen(9999, () => console.log("server running on port 9999"));
