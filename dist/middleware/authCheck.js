"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCheck = void 0;
const authCheck = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.status(401).json({ message: 'You are not authenticated!' });
    }
};
exports.authCheck = authCheck;
