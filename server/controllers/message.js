const express = require("express");
const models = require("../models");
const nodemailer = require("nodemailer");
const key = require("../config/apiKeys.json")["gmailSMTP"];
let transporter = nodemailer.createTransport(key);

const MessageController = {
  registerRouter() {
    const router = express.Router();

    router.post("/", this.sendEmail); // Sending email

    return router;
  },
  sendEmail(req, res) {
    let msg = {
      from: key.auth.user,
      to: "sihansolotop@gmail.com",
      subject: req.body.subject,
      html: "<b>Hello from Ekko, how are you?</b>"
    };

    transporter.sendMail(msg, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
      console.log("Message sent: %s'", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  }
};

module.express = MessageController.registerRouter();
