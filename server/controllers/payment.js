const express = require('express');
const models = require("../models");
const paypal = require("paypal-rest-sdk");

paypal

const PaymentController = {
    registerRouter() {
        const router = express.Router();

        // router.get("/", this.getTransactions);
        // router.get("/:id", this.getDetail);
        router.post("/", this.sendEmail);

        return router;
    }
}

module.exports = PaymentController.registerRouter();