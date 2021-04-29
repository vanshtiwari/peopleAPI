import jwt from 'jsonwebtoken';
import of from '../../helpers/awaitof';
import db from '../../models/index.js';

const newToken = async (refreshToken) => {
  const decoded = jwt.decode(refreshToken);
  const uuid = decoded.uuid;
  const id = decoded.id;

  const [storedRefToken, errr] = await of(db.users.findAll({
    where: { uuid },
    attributes: ['refreshToken']
  }));

  if (storedRefToken) {
    if (storedRefToken[0].dataValues.refreshToken === refreshToken) {
      const newRefreshToken = jwt.sign({ uuid, id }, process.env.REFRESH_SECRET_KEY, { expiresIn: process.env.REFRESH_EXPIRES_IN })
      await db.users.update({ refreshToken }, {
        where: { uuid }
      });
      return newRefreshToken;
    }
  }
  return errr;
}

export default newToken;
