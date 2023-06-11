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
const passport = require('passport');
const session = require('express-session');
const express = require('express');
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
const db_1 = __importDefault(require("../db/db"));
const localStrategy = require('passport-local');
const app = express();
passport.use(new localStrategy(function verify(username, password, done) {
    db_1.default.query('SELECT * FROM auth_user WHERE auth_user.username = $1', [username], (err, results) => __awaiter(this, void 0, void 0, function* () {
        if (err) {
            return done(err);
        }
        if (results.rows.length < 1) {
            return done(null, false, { message: 'User does not exist!' });
        }
        const check = yield bcrypt.compare(password, results.rows[0].password);
        if (!check) {
            return done(null, false, {
                message: 'Incorrect username or password.',
            });
        }
        return done(null, results);
    }));
}));
passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, {
            id: user.rows[0].user_id,
            username: user.rows[0].username,
        });
    });
});
passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});
