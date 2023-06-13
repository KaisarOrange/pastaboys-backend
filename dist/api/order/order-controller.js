"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalRows = exports.revokeFinishOrder = exports.finishOrder = exports.getDetail = exports.insertOrder = exports.deleteCustomer = exports.getCustomer = void 0;
const db_1 = __importDefault(require("../../db/db"));
const express = require('express');
const getCustomer = (req, res) => {
    const page = parseInt(req.params.page) < 1 ? 0 : parseInt(req.params.page);
    const itemPage = (page - 1) * 5;
    db_1.default.query('SELECT orders.order_id, orders.done, customer.*  FROM orders  INNER JOIN customer ON orders.customer_id = customer.id AND orders.done = $1 LIMIT 5 OFFSET $2', [req.params.done, itemPage], (err, results) => {
        if (err) {
            res.status(401).json({ message: err });
        }
        res.status(200).json({ data: results.rows });
    });
};
exports.getCustomer = getCustomer;
const finishOrder = (req, res) => {
    db_1.default.query('UPDATE orders SET done = $1  WHERE order_id = $2 RETURNING *', [true, req.body.order_id], (err, result) => {
        if (err) {
            res.status(401).json({ message: err });
        }
        res
            .status(200)
            .json({ data: result, message: 'success to finish order' });
    });
};
exports.finishOrder = finishOrder;
const getTotalRows = (req, res) => {
    db_1.default.query('SELECT COUNT(*) FROM orders INNER JOIN customer ON orders.customer_id = customer.id AND orders.done = $1', [req.params.done], (err, results) => {
        if (err) {
            res.status(401).json({ message: err });
        }
        else {
            res.status(200).json({ data: results.rows[0] });
        }
    });
};
exports.getTotalRows = getTotalRows;
const revokeFinishOrder = (req, res) => {
    db_1.default.query('UPDATE orders SET done = $1  WHERE order_id = $2 RETURNING *', [false, req.body.order_id], (err, result) => {
        if (err) {
            res.status(401).json({ message: err });
        }
        res
            .status(200)
            .json({ data: result, message: 'success to revoke finish order' });
    });
};
exports.revokeFinishOrder = revokeFinishOrder;
const getDetail = (req, res) => {
    db_1.default.query('SELECT orders.order_id, customer_id, product.product_id, quantity, note, name, price from orders INNER JOIN order_product on orders.order_id = order_product.order_id INNER JOIN product on order_product.product_id = product.product_id WHERE customer_id = $1', [req.params.id], (err, results) => {
        if (err) {
            res.status(401).json({ message: err });
        }
        res.status(200).json({ data: results.rows });
    });
};
exports.getDetail = getDetail;
const insertOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield db_1.default.connect();
    try {
        yield client.query('BEGIN');
        const result = yield client.query('INSERT INTO customer (name, number, adress) values ($1, $2, $3) RETURNING id', [req.body.name, req.body.number, req.body.adress]);
        const resultOrder = yield client.query('INSERT INTO orders(customer_id) VALUES ($1) RETURNING order_id', [result.rows[0].id]);
        for (let i = 0; i < req.body.order.length; i++) {
            let note = req.body.order[i].note
                ? req.body.order[i].note
                : 'tidak ada catatan';
            const resultOrderProduct = yield client.query('INSERT INTO order_product(order_id, product_id, quantity, note) VALUES ($1, $2, $3, $4);', [
                resultOrder.rows[0].order_id,
                req.body.order[i].product_id,
                req.body.order[i].quantity,
                note,
            ]);
        }
        res.status(200).json({ status: 'success' });
        yield client.query('COMMIT');
    }
    catch (err) {
        yield client.query('ROLLBACK');
        throw err;
    }
    finally {
        client.release();
    }
});
exports.insertOrder = insertOrder;
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query('DELETE FROM order_product WHERE order_id = $1 returning *', [req.params.id]);
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteCustomer = deleteCustomer;
