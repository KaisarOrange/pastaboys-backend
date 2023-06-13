"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("./auth-controller");
const express = require('express');
const router = express.Router();
const passport = require('passport');
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            throw err;
        if (!user) {
            res.send('no user');
        }
        else {
            req.login(user, (err) => {
                if (err)
                    throw err;
                res.send('auth good');
                console.log(req.user.rows);
            });
        }
    })(req, res, next);
});
router.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
    }
    else {
        res.send(200, req.user);
    }
});
router.delete('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.send('user Logged Out!');
    });
});
router.post('/signup', auth_controller_1.signup);
module.exports = router;
