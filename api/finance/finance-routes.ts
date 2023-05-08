import { getProductStatSum } from './finance-controller';

const express = require('express');
const router = express.Router();

router.get('/getProductSum', getProductStatSum);

module.exports = router;
