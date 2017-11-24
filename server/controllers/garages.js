const express = require("express");
const models = require("../models");
const NodeGeocoder = require("node-geocoder");
const geolib = require("geolib");
const sequelize = require("sequelize");

// GEOCODER API KEY
let options = {
  provider: "google",

  // Optional depending on the providers
  httpAdapter: "https", // Default
  apiKey: "AIzaSyDDsOGdY2XBMAcCQuUjOUSuHwD_ZZ04WYQ", // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

let geocoder = NodeGeocoder(options); // Initialize geocoder

// GARAGE CONTROLLER
const GaragesController = {
  registerRouter() {
    const router = express.Router();

    router.get("/", this.index);  // Fetch all garages
    router.get("/:id", this.getGarage); // Fetch particular garage
    router.post("/searchResults", this.getSearchResults); // Input zip and return all garages within that zip area
    router.post("/", this.createGarage);  // Create a new garage
    router.get("/:id/photos", this.getImages);  // Fetch images
    router.post(
      "/:id/photos/upload",
      this.addImage
    );  // Upload new images
    router.put("/:id", this.updateGarage); // Update a particular garage
    router.delete("/:id", this.deleteGarage); // Delete a particular garage

    return router;
  },
  index(req, res) {
    models.Garages
      .findAll()
      .then(allGarages => {
        if (!allGarages) {
          res.status(404).json({ msg: "no garage found" });
        }
        res.json(allGarages);
      })
      .catch(console.error);
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
    models.Garages
      .findAll({
        where: {
          Zip: req.body.Zip
        }
      })
      .then(garage => {
        garage.forEach(g => {
          geocoder.geocode(g.dataValues.Address).then(address => {
            let dist = geolib.getDistance(
              { latitude: req.body.lat, longitude: req.body.lon },
              {
                latitude: address[0].latitude,
                longitude: address[0].longitude
              }
            );
            models.Garages.update(
              { Distance: dist },
              { where: { Address: g.dataValues.Address } }
            );
          });
        });

        res.json(garage).send("Result list received");
      })
      .catch(() => {
        res.status(404).send("Failed in receive results");
      });
  }, // Get all garages by zip code
  addImage(req, res) {
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME
    });

    // Create a new Busboy
    let bosboy = new Busboy({ headers: req.headers });

    let file = req.headers.images;
    console.log("file: " + file);

    // let data = {Key: 'imageName', Body: imageFile};
    s3bucket.putObject({Key: file, Body: file}, (err, data) => {
      if(err) {
        console.log("Error uploading data: ", data);
      } else {
        console.log("Successfully uploaded the image");
      }
    });
  
    var urlParams = {Bucket: 'myBucket', Key: 'imageName'};
    s3Bucket.getSignedUrl('getObject', urlParams, function(err, url){
      console.log('the url of the image is', url);
    })
    // uploadToS3(req.files);
    // models.Garages
    //   .update(
    //     {
    //       Photos: sequelize.fn(
    //         "array_append",
    //         sequelize.col("Photos"),
    //         req.file.path
    //       )
    //     },
    //     {
    //       where: {
    //         id: req.params.id
    //       }
    //     }
    //   )
    //   .then(garage => {
    //     res.json(garage).send("Image added to this garage");
    //   })
    //   .catch(() => {
    //     res.status(404).send("Failed to add an image");
    //   });
  },
  getImages(req, res) {
    models.Garages
      .findById(req.params.id)
      .then(garage => {
        res.json(garage.Photos).send("Successfully get images");
      })
      .catch(() => {
        res.status(404).send("Failed to get images");
      });
  },
  createGarage(req, res) {
    geocoder.geocode(req.body.Address).then(address => {
      models.Garages
        .create({
          Address: req.body.Address,
          Renting_Price: req.body.Renting_Price,
          Size: req.body.Size,
          Zip: req.body.Zip === "" ? address[0].zipcode : req.body.Zip
        })
        .then(garage => {
          res.json(garage).send("Create successfully");
        })
        .catch(() => {
          res.status(404).send("Can't create garage");
        });
    });
  }, // Create garage by address & price
  updateGarage(req, res) {
    geocoder.geocode(req.body.Address).then(address => {
      models.Garages
        .update(
          {
            Address: req.body.Address,
            Renting_Price: req.body.Renting_Price,
            Size: req.body.Size,
            Zip: req.body.Zip === "" ? address[0].zipcode : req.body.Zip
          },
          {
            where: {
              id: req.params.id
            }
          }
        )
        .then(garage => {
          res.json(garage).send("Update successfully");
        })
        .catch(() => {
          res.status(404).send("Can't update garage");
        });
    });
  }, // Update only address of the garage
  deleteGarage(req, res) {
    models.Garages
      .findById(parseInt(req.params.id))
      .then(garage => {
        models.Garages.destroy({
          where: {
            id: garage.id
          }
        });
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
