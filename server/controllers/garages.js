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
        .then(allGarages => {
            res.json(allGarages);
        })
    },  // Get all garages
    getGarage(req, res) {   
        models.Garages.findById(parseInt(req.params.id))
        .then(garage => {
            res.json(garage);
        })
    },  // Get garage by id
    getSearchResults(req, res) {
        models.Garages.findAll({
            where: {
                zip: req.body.zip
            }
        })
    },  // Get all garages by zip code
    createGarage(req, res) {
        models.Garages.create({
            Address: req.body.Address,
            Renting_Price: req.body.Renting_Price,
            Size: req.body.Size
        })
        .then(garage => {
            res.json(poll);
        })
        .catch(() => {
            res.sendStatus(400);
        })
    },  // Create garage by address & price
    updateGarage(req, res) {
        models.Garages.findById(parseInt(req.params.id))
        .then(garage => {
            garage.set('Renting_Price', req.body.price);
            garage.save();
            res.json(garage);
        })
        .catch(() => {
            console.log("Can't update");
            res.sendStatus(400);
        })
    },  // Update the price for targetted garage
    deleteGarage(req, res) {
        models.Garages.findById(parseInt(req.params.id))
        .then(garage => {
            models.Garages.destroy({
                where: {
                    id: garage.id
                }
            })
            .then(() => {
                res.sendStatus(201);
            })
        })
        .catch(() => {
            console.log("Can't delete");
            res.sendStatus(400);
        })
    }   // Delete a specific garage
}

module.exports = GaragesController.registerRouter();