import db from '../../models/index.js';
import of from '../../helpers/awaitof.js';

const update = async (data) => {
  if (data.id && (data.name || data.tech || data.company)) {
    const [user, err] = await of(db.users.findOne({ where: { id: data.id } }));
    if (user) {
      const [updatedUser, err] = await of(db.users.update(data, {
        where: { id: data.id }
      }));
      return updatedUser || err;
    } else {
      return err;
    }
  }
}
export default update
