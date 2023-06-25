import { Request, Response } from 'express';
import { signup } from './auth-controller';
import { error } from 'console';

const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login', (req: any, res: any, next: any) => {
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) throw err;
    if (!user) {
      res.status(404).json({ message: 'user not found' });
    } else {
      req.login(user, (err: any) => {
        if (err) throw err;
        res.status(200).json({ message: 'login success' });
        console.log('first');
      });
    }
  })(req, res, next);
});

router.get('/user', (req: any, res: any) => {
  try {
    if (req.isAuthenticated()) {
      res.status(200).json({ isAuthenticated: true });
    } else {
      res.status(200).json({ isAuthenticated: false });
    }
  } catch (error) {
    res.status(401).json({ message: error });
  }
});

router.delete('/logout', (req: any, res: any, next: any) => {
  req.logout(function (err: any) {
    if (err) {
      return next(err);
    }
    res.status(200).send('user Logged Out! :');
  });
});
router.post('/signup', signup);

module.exports = router;
