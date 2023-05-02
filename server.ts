import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import db from './db/index';
const get = require('./api/order/order-routes');
const auth = require('./api/auth/auth-routes');
const session = require('express-session');
var passport = require('passport');
const path = require('node:path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const pgSimpleStore = require('connect-pg-simple')(session);
dotenv.config();
require('./middleware/passportAuth');
const app = express();

const PORT = process.env.PORT || 4000;

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
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
    cookie: { maxAge: 10000 }, // 30 days
    // Insert express-session options here
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.authenticate('session'));

app.use('/order', get);
app.use('/auth', auth);
//app.use(express.urlencoded());

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
