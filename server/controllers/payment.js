const express = require("express");
const models = require("../models");


const PaymentController = {
  registerRouter() {
    const router = express.Router();

    router.get("/", this.getTransactions);
    router.get("/:id", this.getDetail);

    return router;
  },
  getTransactions(req, res) {

  },
  getDetail(req, res) {

  }
};

module.exports = PaymentController.registerRouter();
