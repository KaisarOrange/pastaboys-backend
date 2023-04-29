"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_controller_1 = require("./order-controller");
const express = require('express');
const router = express.Router();
const passport = require('passport');
router.get('/', order_controller_1.getCustomer);
router.get('/detail/:id', order_controller_1.getDetail);
router.get('/test', (req, res) => {
    console.log('hehe ', req.session.passport.user);
    res.send({ message: req.isAuthenticated() });
});
router.get('/testLogOut', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        console.log(req.isAuthenticated());
    });
});
router.post('/pesan', order_controller_1.insertOrder);
router.delete('/delete/:id', order_controller_1.deleteCustomer);
module.exports = router;
