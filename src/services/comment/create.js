import db from '../../models/index.js';
import of from '../../helpers/awaitof.js';

const create = async (data) => {
  if (data.comment && data.cid && data.uuid) {
    const [response, err] = await of(db.comments.create(data));
    return response || err;
  }
}
export default create;
