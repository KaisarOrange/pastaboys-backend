"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const finance_controller_1 = require("./finance-controller");
const express = require('express');
const router = express.Router();
router.get('/getProductSum', finance_controller_1.getProductStatSum);
router.get('/getTotalSumRevenue', finance_controller_1.getTotalSumRevenue);
module.exports = router;
