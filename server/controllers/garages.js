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
    router.post("/", this.createGarage);
    router.post("/:id/garageAddress", this.addAddress);
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
    models.ZipCode.findAll({
      where: {
        zip: req.body.zip
      }
    }).then(garages => {
      res.json(garages).send("Result list received");
    }).catch(() => {
      res.status(404).send("Failed in receive results");
    });
  }, // Get all garages by zip code
  createGarage(req, res) {
    models.Garages
      .create({
        Renting_Price: req.body.Renting_Price,
        Size: req.body.Size
      })
      .then(garage => {
        res.json(garage).send("Create successfully");
        // res.status(404);
      })
      .catch(() => {
        res.status(404).send("Can't create garage");
      });
  }, // Create garage by address & price
  addAddress(req, res) {
    /*
    models.Garages.findById(parseInt(req.params.id))
    .then(garage => {
      geocoder.geocode(garage.body.Address)
      .then(address => {
        models.GarageAddress.create({
          latitude: address[0].latitude,
          longtitude: address[0].longtitude,
          country: address[0].country,
          city: address[0].city,
          streetName: address[0].streetName + address[0].streetNumber,
          zip: address[0].zipcode
        }).then(garageAddress => {
          models.ZipCode.create({
            
          })
        })
      })
    })
    */
  },
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
        res.status(404).send("Can't update garage");
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
        res.status(404).send("Can't delete garage");
      });
  } // Delete a specific garage
};

module.exports = GaragesController.registerRouter();
