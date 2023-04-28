import { Request, Response } from 'express';
import { signup } from './auth-controller';

const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/hahaha' }),
  (req: any, res: any) => {
    res.status(200).json({ message: 'hehexd' });
  }
);
router.post('/signup', signup);

module.exports = router;
