const express = require("express");
const models = require("../models");
const NodeGeocoder = require("node-geocoder");

var options = {
  provider: "google",

  // Optional depending on the providers
  httpAdapter: "https", // Default
  apiKey: "AIzaSyDDsOGdY2XBMAcCQuUjOUSuHwD_ZZ04WYQ", // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};


const GaragesController = {
  registerRouter() {
    const router = express.Router();

    router.get("/", this.index);
    router.get("/:id", this.getGarage);
    router.get("/:zip", this.getSearchResults);
    router.post("/geolocation", this.getLatlon);
    router.post("/", this.createGarage);
    router.put("/:id", this.updateAddress);
    router.delete("/:id", this.deleteGarage);

    return router;
  },
  index(req, res) {
    models.Garages.findAll().then(allGarages => {
      res.json(allGarages);
    });
  }, // Get all garages
  getGarage(req, res) {
    models.Garages.findById(parseInt(req.params.id)).then(garage => {
      res.json(garage);
    });
  }, // Get garage by id
  getSearchResults(req, res) {
    models.Garages.findAll({
      where: {
        zip: req.body.zip
      }
    });
  }, // Get all garages by zip code
  getLatlon(req, res) {
    let geocoder = NodeGeocoder(options);
    geocoder
      .geocode(req.body.zip)
      .then(latlon => {
        let location = {
            "latitude": latlon[0].latitude,
            "longitude": latlon[0].longitude
        }
        res.send(location);
      })
      .catch(err => {
        console.log("Can't return latlon");
      });
  },
  createGarage(req, res) {
    models.Garages
      .create({
        Address: req.body.Address,
        Renting_Price: req.body.Renting_Price,
        Size: req.body.Size
      })
      .then(garage => {
        console.log("Create successfully");
        res.sendStatus(201);
      })
      .catch(() => {
        res.sendStatus(400);
      });
  }, // Create garage by address & price
  updateAddress(req, res) {
    models.Garages
      .update(
        {
          Address: req.body.Address,
          Renting_Price: req.body.Renting_Price,
          Size: req.body.Size
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(() => {
        res.sendStatus(201);
      })
      .catch(() => {
        console.log("Can't Update");
      });
  }, // Update only address of the garage
  deleteGarage(req, res) {
    models.Garages
      .findById(parseInt(req.params.id))
      .then(garage => {
        models.Garages
          .destroy({
            where: {
              id: garage.id
            }
          })
          .then(() => {
            res.sendStatus(201);
          });
      })
      .then(() => {
        res.redirect("/garages");
      })
      .catch(() => {
        console.log("Can't delete");
        res.sendStatus(400);
      });
  } // Delete a specific garage
};

module.exports = GaragesController.registerRouter();
