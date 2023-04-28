const jwt = require('jsonwebtoken');

type jwtParams = {
  user_id: string;
  email: string;
  username: string;
};

const jwtTokens = ({ user_id, email, username }: jwtParams) => {
  const user = { user_id, email, username };
  const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '20s',
  });
  const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '5m',
  });

  return { accessToken, refreshToken };
};

export { jwtTokens };
