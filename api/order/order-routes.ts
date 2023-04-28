import { authToken } from '../../middleware/authMiddle';
import { deleteCustomer, getCustomer, insertOrder } from './order-controller';
import { authCheck } from '../../middleware/authCheck';

const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', getCustomer);

router.get('/test', (req: any, res: any) => {
  console.log('hehe ', req.session.passport.user);
  res.send({ message: req.isAuthenticated() });
});
router.get('/testLogOut', (req: any, res: any, next: any) => {
  req.logout(function (err: any) {
    if (err) {
      return next(err);
    }

    console.log(req.isAuthenticated());
  });
});

router.post('/pesan', insertOrder);

router.delete('/delete/:id', deleteCustomer);

module.exports = router;
