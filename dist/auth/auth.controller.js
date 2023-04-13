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
exports.signup = exports.login = void 0;
const db_1 = __importDefault(require("../db"));
const jwtFun_1 = require("../utils/jwtFun");
const bcrypt = require('bcrypt');
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const login = yield db_1.default.query('SELECT * FROM auth_user WHERE auth_user.username = $1', [req.body.username]);
        if (login.rows.length === 0) {
            return res.status(401).json({ message: 'incorrect username' });
        }
        const check = yield bcrypt.compare(req.body.password, login.rows[0].password);
        if (check === true) {
            const tokens = (0, jwtFun_1.jwtTokens)(login.rows[0]);
            res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
            res.json(tokens);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt.hash(req.body.password, 10);
        const user = yield db_1.default.query('SELECT username FROM auth_user WHERE username = $1 OR email = $2', [req.body.username, req.body.email]);
        console.log(user);
        if (user.rows.length > 0) {
            return res.status(401).json({ message: 'user already exist' });
        }
        const sign = yield db_1.default.query('INSERT INTO auth_user (email, username, password) VALUES ($1, $2, $3) RETURNING *', [req.body.email, req.body.username, hashedPassword]);
        res.status(200).json({ user: sign.rows[0] });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.signup = signup;
