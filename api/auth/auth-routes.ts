import { Request, Response } from 'express';
import { signup } from './auth-controller';

const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login', (req: any, res: any, next: any) => {
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) throw err;
    if (!user) {
      res.send('no user');
    } else {
      req.login(user, (err: any) => {
        if (err) throw err;
        res.send('auth good');
        console.log(req.user.rows);
      });
    }
  })(req, res, next);
});

router.get('/user', (req: any, res: any) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else {
    res.send(200, false);
  }
});

router.delete('/logout', (req: any, res: any, next: any) => {
  req.logout(function (err: any) {
    if (err) {
      return next(err);
    }
    res.send('user Logged Out!');
  });
});
router.post('/signup', signup);

module.exports = router;
