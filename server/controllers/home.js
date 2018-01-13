const express = require('express');
const model = require('../models');
const path = require('path');

const HomeController = {
    registerRouter() {
        const router = express.Router();

        router.get('/', this.index);

        return router;
    },
    index(req, res) {
        // res.json({
        //     msg: "Successful GET to home router"
        // });
        res.sendFile(path.join(__dirname+'client/build/index.html'));
    }
};

module.exports = HomeController.registerRouter();