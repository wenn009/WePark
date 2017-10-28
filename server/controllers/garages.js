const express = require("express");
const models = require("../models");
const NodeGeocoder = require("node-geocoder");

let options = {
    provider: "google",
  
    // Optional depending on the providers
    httpAdapter: "https", // Default
    apiKey: "AIzaSyDDsOGdY2XBMAcCQuUjOUSuHwD_ZZ04WYQ", // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
  };

let geocoder = NodeGeocoder(options); // Initialize geocoder

const GaragesController = {
  registerRouter() {
    const router = express.Router();

    router.get("/", this.index);
    router.get("/:id", this.getGarage);
    router.post("/searchResults", this.getSearchResults); // Input zip and return all garages within that zip area
    router.post("/geolocation", this.getLatlon);  // Input zip, and get latitude & lontitude of that zip area
    router.post("/", this.createGarage);
    router.put("/:id", this.updateAddress);
    router.delete("/:id", this.deleteGarage);

    return router;
  },
  index(req, res) {
    models.Garages
      .findAll()
      .then(allGarages => {
        if (!allGarages) {
          res.status(404).json({msg: "no garage found"})
        }
        res.json(allGarages);
      }).catch(console.error);
  }, // Get all garages
  getGarage(req, res) {
    models.Garages
      .findById(parseInt(req.params.id))
      .then(garage => {
        res.json(garage);
      })
      .catch(() => {
        res.status(404);
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
    geocoder
      .geocode(req.body.zip)
      .then(latlon => {
        res.send({
            latitude: latlon[0].latitude,
            longitude: latlon[0].longitude
          });
      })
      .then(location => {
        res.json(location).send("Location returned");
      })
      .catch(() => {
        res.status(404).send('error');
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
        res.json(garage).send("Create successfully");
        // res.status(404);
      })
      .catch(() => {
        res.status(404).send("Can't create");
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
      ).then(garage => {
        res.json(garage).send("Update successfully");
      })
      .catch(() => {
        res.status(404);
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
      })
      .then(() => {
        res.redirect("/garages").send("Redirect successfully");
      })
      .catch(() => {
        res.status(404);
      });
  } // Delete a specific garage
};

module.exports = GaragesController.registerRouter();
