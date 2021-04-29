import db from '../../models/index.js';
import of from '../../helpers/awaitof.js';
import { payload } from '../../middlewares/passport';

const del = async (cmid) => {
  const uuid = payload.uuid;
  const [comment, err] = await of(db.comments.findOne({
    where: { uuid, cmid }
  }));
  if (comment) {
    const [response, err] = await of(db.comments.destroy({
      where: { cmid }
    }));
    return response || err;
  } else {
    return err
  }
}
export default del;
