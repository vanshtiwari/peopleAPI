import db from '../../models/index.js';
import of from '../../helpers/awaitof.js';
import { payload } from '../../middlewares/passport';

const create = async ({ comment, cid }) => {
  if (comment) {
    const uuid = payload.uuid;
    const data = {
      comment,
      cid,
      uuid
    }
    const [response, err] = await of(db.comments.create(data));
    return response || err;
  }
}
export default create;
