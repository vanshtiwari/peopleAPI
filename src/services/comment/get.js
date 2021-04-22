import db from '../../models/index.js';
import of from '../../helpers/awaitof.js';

const get = async () => {
  const [response, err] = await of(db.comments.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }));
  return response || err;
}
export default get;
