const express = require('express');
const userRoute = express.Router();

// Business model
let UserModel = require('../models/user');

userRoute.route('/').get((req, res) => {
    res.send('Hello!')
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