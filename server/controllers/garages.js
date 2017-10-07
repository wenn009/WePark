const express = require('express');
const models = require('../models');

const GaragesController = {
    registerRouter() {
        const router = express.Router();

        router.get('/', this.index);
        router.get('/:id', this.getGarage);
        router.get('/:zip', this.getSearchResults);
        router.post('/', this.createGarage);
        router.put('/:id', this.updateGarage);
        router.delete('/:id', this.deleteGarage);

        return router;
    },
    index(req, res) {
        models.Garages.findAll()
        .then(garages => {
            res.json({
                garages: garages
            });
        })
    },
    getGarage(req, res) {

    },
    getSearchResults(req, res) {

    },
    createGarage(req, res) {

    },
    updateGarage(req, res) {

    },
    deleteGarage(req, res) {

    }
}

module.exports = GaragesController.registerRouter();