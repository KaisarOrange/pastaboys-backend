import { authToken } from '../../middleware/authMiddle';
import {
  deleteCustomer,
  getCustomer,
  insertOrder,
  getDetail,
  finishOrder,
  revokeFinishOrder,
  getTotalRows,
} from './order-controller';
import { authCheck } from '../../middleware/authCheck';

const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/getOrder/:done/:page', authCheck, getCustomer);
router.get('/detail/:id', authCheck, getDetail);
router.get('/totalrows/:done', authCheck, getTotalRows);

router.get('/test', (req: any, res: any) => {
  res.status(200).json({ data: req.user });
});

router.put('/finishOrder', authCheck, finishOrder);
router.put('/revokeFinishOrder', authCheck, revokeFinishOrder);

router.post('/pesan', insertOrder);

router.delete('/delete/:id', deleteCustomer);

module.exports = router;
