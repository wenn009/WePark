const express = require('express');
const model = require('../models');

const UserController = {
    registerRouter() {
        const router = express.Router();

        router.get('/', this.index);
        router.post('/', this.create);
        router.get('/:id', this.getUser)
        router.put('/:id', this.update);

        return router;
    },
    index(req, res) {
        models.Users.findAll()
        .then(allUsers => {
            res.json(allUsers)
        })
    },  // Return all the users in record
    create(req, res) {
        models.Users.create({
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            UserType: req.body.userType,
            PhoneNumber: req.body.phoneNumber,
            Address: req.body.address,
            email: req.body.email
        })
        .then(user => {
            res.json(user);
        })
        .catch(() => {
            console.log("Can't create user");
        })
    },  // Create a new user with these data
    getUser(req, res) {
        models.Users.findById(parseInt(req.params.id))
        .then(user => {
            res.json(user);
        })
        .catch(() => {
            console.log("Can't get this user");
        })
    },  
    update(req, res) {
        models.Users.update({
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            UserType: req.body.userType,
            PhoneNumber: req.body.phoneNumber,
            Address: req.body.address,
            email: req.body.email
        }, {
            where: {
                id: req.params.id
            }
        })
    },
};


module.exports = UserController.registerRouter();