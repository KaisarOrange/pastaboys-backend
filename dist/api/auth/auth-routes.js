"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("./auth-controller");
const express = require('express');
const router = express.Router();
const passport = require('passport');
router.post('/login', passport.authenticate('local', { failureRedirect: '/hahaha' }), (req, res) => {
    res.status(200).json({ message: 'hehexd' });
});
router.post('/signup', auth_controller_1.signup);
module.exports = router;
