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
        let temp = path.join(__dirname+'client/build/index.html');
        res.json({
            msg: "Successful GET to home router"
        });
        //res.sendFile('/index.html');
        //res.sendFile('/app/client/public/index.html');
    }
};

module.exports = HomeController.registerRouter();