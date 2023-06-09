"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("./auth.controller");
const express = require('express');
const router = express.Router();
const passport = require('passport');
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send({ message: 'Hello' });
});
router.post('/signup', auth_controller_1.signup);
module.exports = router;
