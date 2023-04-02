import { deleteCustomer, getCustomer, insertOrder } from './order-controller';

const express = require('express');
const router = express.Router();

router.get('/', getCustomer);

router.post('/pesan', insertOrder);

router.delete('/delete/:id', deleteCustomer);

module.exports = router;
