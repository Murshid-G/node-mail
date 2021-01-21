const http = require('http')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const env = require('dotenv').config()
const nodemailer = require('nodemailer')
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("hello")
})
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname + '/contact.html'));
})
app.post('/contact', (req, res) => {
    "use strict";
// const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // service: 'Gmail',
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_EMAIL, // generated ethereal user
      pass: process.env.GMAIL_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: req.body.email,// sender address
    to: 'yourmail@gmail.com', // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: req.body.msg, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
    console.log('hi')
})
app.listen(PORT, () => (
    console.log("you are listing on port", PORT)
))
