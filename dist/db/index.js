"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool } = require('pg');
const db = new Pool();
exports.default = db;
