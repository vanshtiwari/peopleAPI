import db from '../../models/index.js';
import of from '../../helpers/awaitof.js';

const update = async (data) => {
  if (data.id && (data.name || data.uuid)) {
    const [contact, err] = await of(db.contacts.findOne({
      where: { id: data.id }
    }));
    if (contact) {
      const [updatedContact, err] = await of(db.contacts.update(data, {
        where: { id: data.id }
      }));
      return updatedContact || err;
    } else {
      return err
    }
  }
}
export default update;
