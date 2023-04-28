"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtTokens = void 0;
const jwt = require('jsonwebtoken');
const jwtTokens = ({ user_id, email, username }) => {
    const user = { user_id, email, username };
    const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '20s',
    });
    const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '5m',
    });
    return { accessToken, refreshToken };
};
exports.jwtTokens = jwtTokens;
