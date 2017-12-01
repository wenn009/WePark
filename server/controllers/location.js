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

const LocationController = {
  registerRouter() {
    const router = express.Router();

    router.post("/", this.getLatlon); // Input zip, and get latitude & lontitude of that zip area

    return router;
  },
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
        res.json(location);
      })
      .catch(() => {
        res.status(404).send("error");
      });
  }
};


module.exports = LocationController.registerRouter();