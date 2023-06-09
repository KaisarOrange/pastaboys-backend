"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = void 0;
const jwt = require('jsonwebtoken');
const authToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
        if (token === null) {
            return res.status(401).json({ message: 'Token is null' });
        }
        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (error, user) => {
            if (error) {
                return res.status(403).json({ error: error.message });
            }
            req.body.user = user;
            next();
        });
    }
    catch (error) {
        res.json({ message: error });
    }
};
exports.authToken = authToken;
