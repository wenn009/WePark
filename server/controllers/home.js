const express = require('express');
const model = require('../models');


const HomeController = {
    registerRouter() {
        const router = express.Router();

        router.get('/', this.index);

        return router;
    },
    index(req, res) {
        res.json({
            msg: "Successful GET to home router"
        });
    }
};

module.exports = HomeController.registerRouter();