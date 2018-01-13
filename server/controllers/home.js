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
        // res.json({
        //     msg: temp/*"Successful GET to home router"*/
        // });
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
        //res.sendFile('app/server/client/build/index.html');
    }
};

module.exports = HomeController.registerRouter();