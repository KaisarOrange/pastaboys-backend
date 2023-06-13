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

router.get('/getOrder/:done/:page', getCustomer);
router.get('/detail/:id', getDetail);
router.get('/totalrows/:done', getTotalRows);

router.get('/test', (req: any, res: any) => {
  res.send(req.user);
});

router.put('/finishOrder', finishOrder);
router.put('/revokeFinishOrder', revokeFinishOrder);

router.post('/pesan', insertOrder);

router.delete('/delete/:id', deleteCustomer);

module.exports = router;
