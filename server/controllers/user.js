const express = require("express");
const models = require("../models");

const UserController = {
  registerRouter() {
    const router = express.Router();

    router.get("/", this.index);
    router.post("/", this.create);
    router.get("/:id", this.getUser);
    router.put("/:id", this.update);

    return router;
  },
  index(req, res) {
    models.Users
      .findAll()
      .then(allUsers => {
        if (!allUsers) {
            res.status(404);
        }
        res.json(allUsers).send("Succeed in geting all users");
      })
      .catch(console.error);
  }, // Return all the users in record
  create(req, res) {
    models.Users
      .create({
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        UserType: req.body.userType,
        PhoneNumber: req.body.phoneNumber,
        Address: req.body.address,
        email: req.body.email
      })
      .then(user => {
        res.json(user).send("Succeed in creating an user");
      })
      .catch(() => {
        res.status(404).send("Failed to create an user");
      });
  }, // Create a new user with these data
  getUser(req, res) {
    models.Users
      .findById(parseInt(req.params.id))
      .then(user => {
        res.json(user).send("Succeed in get an user");
      })
      .catch(() => {
        res.status(404).send("Failed to get that user");
      });
  }, // Get a particular user's data
  update(req, res) {
    models.Users
      .update(
        {
          FirstName: req.body.firstName,
          LastName: req.body.lastName,
          UserType: req.body.userType,
          PhoneNumber: req.body.phoneNumber,
          Address: req.body.address,
          email: req.body.email
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(user => {
        res.json(user).send("Succeed in update user");
      })
      .catch(() => {
        res.status(404).send("Failed to update user");
      });
  } // Update a particular user's data
};

module.exports = UserController.registerRouter();
