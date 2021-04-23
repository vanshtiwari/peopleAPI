import jwt from 'jsonwebtoken';

const newToken = ({ uuid, id }) => {
  refreshToken = jwt.sign({ uuid, id }, process.env.REFRESH_SECRET_KEY, { expiresIn: process.env.REFRESH_EXPIRES_IN })
  return refreshToken;
}

export {
  newToken
}
