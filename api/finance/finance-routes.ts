import {
  getProductStatSum,
  getTotalSumRevenue,
  getTotalOrderedProduct,
} from './finance-controller';

const express = require('express');
const router = express.Router();

router.get('/getProductSum', getProductStatSum);

router.get('/getTotalSumRevenue', getTotalSumRevenue);

router.get('/getTotalOrderedProduct', getTotalOrderedProduct);

module.exports = router;
