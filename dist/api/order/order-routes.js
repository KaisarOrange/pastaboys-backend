"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_controller_1 = require("./order-controller");
const express = require('express');
const router = express.Router();
const passport = require('passport');
router.get('/getOrder/:done/:page', order_controller_1.getCustomer);
router.get('/detail/:id', order_controller_1.getDetail);
router.get('/totalrows/:done', order_controller_1.getTotalRows);
router.get('/test', (req, res) => {
    res.send(req.user);
});
router.put('/finishOrder', order_controller_1.finishOrder);
router.put('/revokeFinishOrder', order_controller_1.revokeFinishOrder);
router.post('/pesan', order_controller_1.insertOrder);
router.delete('/delete/:id', order_controller_1.deleteCustomer);
module.exports = router;
