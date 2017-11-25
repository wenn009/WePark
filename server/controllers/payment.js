const express = require("express");
const models = require("../models");
const nodemailer = require("nodemailer");
const key = require('../config/apiKeys.json')["gmailSMTP"];
let transporter = nodemailer.createTransport(key);

const PaymentController = {
  registerRouter() {
    const router = express.Router();

    // router.get("/", this.getTransactions);
    // router.get("/:id", this.getDetail);
    router.post("/", this.sendEmail); // Testing for sending email

    return router;
  },
  sendEmail(req, res) {
    let msg = {
      from: 'a1099337011@gmail.com',
      to: "sihansolotop@gmail.com",
      subject: "Hello",
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

module.exports = PaymentController.registerRouter();
