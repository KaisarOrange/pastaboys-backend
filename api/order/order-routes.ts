import { authToken } from '../../middleware/authMiddle';
import {
  deleteCustomer,
  getCustomer,
  insertOrder,
  getDetail,
  finishOrder,
} from './order-controller';
import { authCheck } from '../../middleware/authCheck';

const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/getOrder/:done', authCheck, getCustomer);
router.get('/detail/:id', authCheck, getDetail);

router.get('/test', (req: any, res: any) => {
  res.send(req.user);
});

router.put('/finishOrder', authCheck, finishOrder);

router.post('/pesan', insertOrder);

router.delete('/delete/:id', deleteCustomer);

module.exports = router;
