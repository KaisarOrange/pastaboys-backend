"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddle_1 = require("../middleware/authMiddle");
const order_controller_1 = require("./order-controller");
const express = require('express');
const router = express.Router();
const passport = require('passport');
router.get('/', authMiddle_1.authToken, order_controller_1.getCustomer);
router.get('/test', (req, res) => {
    console.log('hehe ', req.session.passport.user);
    res.send({ message: 'Hello' });
});
router.post('/pesan', order_controller_1.insertOrder);
router.delete('/delete/:id', order_controller_1.deleteCustomer);
module.exports = router;
