import db from '../../models/index.js';
import of from '../../helpers/awaitof.js';

const logout = async ({ uuid }) => {
  const [clearRefreshToken, err] = await of(db.users.update({ refreshToken: 'none' }, {
    where: { uuid }
  }));
  return clearRefreshToken || err;
}

export {
  logout
}
