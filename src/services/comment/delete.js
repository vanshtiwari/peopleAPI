import db from '../../models/index.js';
import of from '../../helpers/awaitof.js';

const del = async (id) => {
  const [contact, err] = await of(db.comments.findOne({
    where: { id }
  }));
  if (contact) {
    const [response, err] = await of(db.comments.destroy({
      where: { id }
    }));
    return response || err;
  } else {
    return err
  }

}
export default del;
