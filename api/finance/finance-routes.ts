import { getProductStatSum, getTotalSumRevenue } from './finance-controller';

const express = require('express');
const router = express.Router();

router.get('/getProductSum', getProductStatSum);

router.get('/getTotalSumRevenue', getTotalSumRevenue);

module.exports = router;
