"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const get = require('./order/order-routes');
const auth = require('./auth/auth-routes');
const cors = require('cors');
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express_1.default.json());
app.use('/order', get);
app.use('/auth', auth);
//app.use(express.urlencoded());
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
