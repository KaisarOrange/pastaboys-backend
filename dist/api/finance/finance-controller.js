"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductStatSum = void 0;
const db_1 = __importDefault(require("../../db"));
const getProductStatSum = (req, res) => {
    db_1.default.query('SELECT product.name, order_product.product_id, COUNT(order_product.product_id) FROM order_product INNER JOIN product ON order_product.product_id = product.product_id GROUP BY product.name, order_product.product_id', (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json({ data: result.rows });
    });
};
exports.getProductStatSum = getProductStatSum;
