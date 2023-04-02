"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_controller_1 = require("./order-controller");
const express = require('express');
const router = express.Router();
router.get('/', order_controller_1.getCustomer);
router.post('/pesan', order_controller_1.insertOrder);
router.delete('/delete/:id', order_controller_1.deleteCustomer);
module.exports = router;
