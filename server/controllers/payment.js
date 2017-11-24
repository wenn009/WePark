const express = require('express');
const models = require("../models");
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'sihansolotop@gmail.com',
    port: 487,
    secure: false,
    auth: {
        user: 'sihansolotop@gmail.com',
        pass: '1Lovelike'
    }
});


const PaymentController = {
    registerRouter() {
        const router = express.Router();

        // router.get("/", this.getTransactions);
        // router.get("/:id", this.getDetail);
        router.post("/", this.sendEmail);

        return router;
    },
    sendEmail(req, res) {
        let message = {
            from: 'sihansolotop@gmail.com',
            to: 'sihansolotop@gmail.com',
            subject: 'Anything',
            text: 'HEHEHE',
            html: '<p>HTML version of the message</p>'
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                return console.log(err);
            }
            console.log("Message sent: %s'", info.messageId);
        })
    }
}

module.exports = PaymentController.registerRouter();