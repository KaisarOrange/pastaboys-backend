"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCheck = void 0;
const authCheck = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.send('You are not authenticated!!!');
    }
};
exports.authCheck = authCheck;
