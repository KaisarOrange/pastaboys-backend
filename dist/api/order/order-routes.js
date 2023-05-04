"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_controller_1 = require("./order-controller");
const authCheck_1 = require("../../middleware/authCheck");
const express = require('express');
const router = express.Router();
const passport = require('passport');
router.get('/getOrder/:done/:page', authCheck_1.authCheck, order_controller_1.getCustomer);
router.get('/detail/:id', authCheck_1.authCheck, order_controller_1.getDetail);
router.get('/test', (req, res) => {
    res.send(req.user);
});
router.put('/finishOrder', authCheck_1.authCheck, order_controller_1.finishOrder);
router.put('/revokeFinishOrder', authCheck_1.authCheck, order_controller_1.revokeFinishOrder);
router.post('/pesan', order_controller_1.insertOrder);
router.delete('/delete/:id', order_controller_1.deleteCustomer);
module.exports = router;
