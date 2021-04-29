import db from '../../models/index.js';
import of from '../../helpers/awaitof.js';
import { payload } from '../../middlewares/passport';

const logOut = async () => {
  const uuid = payload.uuid;
  const [clearRefreshToken, err] = await of(db.users.update({ refreshToken: 'none' }, {
    where: { uuid }
  }));
  return clearRefreshToken || err;
}

export default logOut;
