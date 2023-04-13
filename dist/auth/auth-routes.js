"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("./auth.controller");
const express = require('express');
const router = express.Router();
router.post('/login', auth_controller_1.login);
router.post('/signup', auth_controller_1.signup);
module.exports = router;
