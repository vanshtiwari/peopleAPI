import db from '../../models/index.js';
import of from '../../helpers/awaitof.js';
import { payload } from '../../middlewares/passport';

const get = async (cid) => {
  const uuid = payload.uuid;
  const [response, err] = await of(db.comments.findAll({
    where: { uuid, cid },
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }));
  return response || err;
}
export default get;
