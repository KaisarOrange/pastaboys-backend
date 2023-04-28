import { RequestHandler } from 'express';
const jwt = require('jsonwebtoken');

const authToken: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (token === null) {
      return res.status(401).json({ message: 'Token is null' });
    }
    jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET,
      (error: any, user: any) => {
        if (error) {
          return res.status(403).json({ error: error.message });
        }
        req.body.user = user;
        next();
      }
    );
  } catch (error) {
    res.json({ message: error });
  }
};

export { authToken };
