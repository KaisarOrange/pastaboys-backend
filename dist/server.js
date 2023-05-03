"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./db/index"));
const get = require('./api/order/order-routes');
const auth = require('./api/auth/auth-routes');
const session = require('express-session');
var passport = require('passport');
const path = require('node:path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const pgSimpleStore = require('connect-pg-simple')(session);
dotenv_1.default.config();
require('./middleware/passportAuth');
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const corsConfig = {
    origin: true,
    credentials: true,
};
app.use(cors(corsConfig));
app.use(express_1.default.json());
app.use(cookieParser());
app.use(express_1.default.static(path.join(__dirname, 'public')));
app.use(session({
    store: new pgSimpleStore({
        pool: index_1.default,
    }),
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 1 }, // 30 days
    // Insert express-session options here
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));
app.use('/auth', auth);
app.use('/order', get);
//app.use(express.urlencoded());
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
