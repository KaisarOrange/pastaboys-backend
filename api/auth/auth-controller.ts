import { Request, Response } from 'express';
import db from '../../db/db';
import { jwtTokens } from '../../utils/jwtFun';
const bcrypt = require('bcrypt');

// const login = async (req: Request, res: Response) => {
//   try {
//     const login = await db.query(
//       'SELECT * FROM auth_user WHERE auth_user.username = $1',
//       [req.body.username]
//     );
//     if (login.rows.length === 0) {
//       return res.status(401).json({ message: 'incorrect username' });
//     }
//     const check = await bcrypt.compare(
//       req.body.password,
//       login.rows[0].password
//     );
//     if (check === true) {
//       const tokens = jwtTokens(login.rows[0]);
//       res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
//       res.json(tokens);
//     }
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

const signup = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await db.query(
      'SELECT username FROM auth_user WHERE username = $1 OR email = $2',
      [req.body.username, req.body.email]
    );
    console.log(user);
    if (user.rows.length > 0) {
      return res.status(401).json({ message: 'user already exist' });
    }
    const sign = await db.query(
      'INSERT INTO auth_user (email, username, password) VALUES ($1, $2, $3) RETURNING *',
      [req.body.email, req.body.username, hashedPassword]
    );
    res.status(200).json({ user: sign.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { signup };
