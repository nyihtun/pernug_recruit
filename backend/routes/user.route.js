const express = require('express');
const userRoute = express.Router();

// Business model
let UserModel = require('../models/user');

userRoute.route('/').get((req, res) => {
    res.send('Hi, the API is running.')
})

userRoute.route('/ls-users').get((req, res) => {
    UserModel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

userRoute.route('/add').post((req, res, next) => {
    UserModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.send("Thanks. Your request has been submitted.")
        }
    })
});

module.exports = userRoute;