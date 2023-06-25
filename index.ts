import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import db from './db/db';
const get = require('./api/order/order-routes');
const auth = require('./api/auth/auth-routes');
const finance = require('./api/finance/finance-routes');
const session = require('express-session');
var passport = require('passport');
const path = require('node:path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const qrcode = require('qrcode-terminal');

const pgSimpleStore = require('connect-pg-simple')(session);
dotenv.config();
require('./middleware/passportAuth');
const app = express();

const port = process.env.PORT || 8500;

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(
  cors({ credentials: true, origin: 'https://admin-pastaboys.vercel.app' })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    store: new pgSimpleStore({
      pool: db,
    }),

    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 1, httpOnly: false }, // 30 days
    // Insert express-session options here
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(passport.authenticate('session'));

app.use('/auth', auth);
app.use('/order', get);
app.use('/finance', finance);

//app.use(express.urlencoded());

//WEBWJS

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
