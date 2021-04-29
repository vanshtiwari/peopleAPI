import db from '../../models/index.js';
import of from '../../helpers/awaitof.js';

const update = async (data) => {
  if (data.cid) {
    const [contact, err] = await of(db.contacts.findOne({
      where: { cid: data.cid }
    }));
    if (contact) {
      const [updatedContact, err] = await of(db.contacts.update(data, {
        where: { cid: data.cid }
      }));
      return updatedContact || err;
    } else {
      return err
    }
  }
}
export default update;
