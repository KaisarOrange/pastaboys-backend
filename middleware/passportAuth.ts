const passport = require('passport');
const session = require('express-session');
const express = require('express');
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
import db from '../db';

const localStrategy = require('passport-local');

const app = express();

passport.use(
  new localStrategy(function verify(
    username: string,
    password: string,
    done: any
  ) {
    db.query(
      'SELECT * FROM auth_user WHERE auth_user.username = $1',
      [username],
      async (err: Error, results: any) => {
        if (err) {
          return done(err);
        }

        if (results.rows.length < 1) {
          return done(null, false, { message: 'User does not exist!' });
        }

        const check = await bcrypt.compare(password, results.rows[0].password);
        if (!check) {
          return done(null, false, {
            message: 'Incorrect username or password.',
          });
        }

        return done(null, results);
      }
    );
  })
);

passport.serializeUser(function (user: any, cb: any) {
  process.nextTick(function () {
    cb(null, {
      id: user.rows[0].user_id,
      username: user.rows[0].username,
    });
  });
});

passport.deserializeUser(function (user: any, cb: any) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
