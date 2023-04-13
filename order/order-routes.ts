import { authToken } from '../middleware/authMiddle';
import { deleteCustomer, getCustomer, insertOrder } from './order-controller';

const express = require('express');
const router = express.Router();

router.get('/', authToken, getCustomer);

router.post('/pesan', insertOrder);

router.delete('/delete/:id', deleteCustomer);

module.exports = router;
