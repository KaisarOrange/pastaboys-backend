"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const get = require('./api/order/order-routes');
const auth = require('./api/auth/auth-routes');
const finance = require('./api/finance/finance-routes');
const session = require('express-session');
var passport = require('passport');
const path = require('node:path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const pgSimpleStore = require('connect-pg-simple')(session);
dotenv_1.default.config();
require('./middleware/passportAuth');
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// const corsConfig = {
//   origin: true,
//   credentials: true,
// };
// app.use(cors(corsConfig));
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(
//   session({
//     store: new pgSimpleStore({
//       pool: db,
//     }),
//     secret: process.env.SECRET,
//     saveUninitialized: false,
//     resave: false,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 * 1 }, // 30 days
//     // Insert express-session options here
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(passport.authenticate('session'));
app.get('/', function (req, res) {
    res.send('GeeksforGeeksaaaaaaaaaa');
});
// app.use('/auth', auth);
// app.use('/order', get);
// app.use('/finance', finance);
//app.use(express.urlencoded());
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
