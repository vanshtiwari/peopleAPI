import db from '../../models/index.js';
import of from '../../helpers/awaitof.js';
import { payload } from '../../middlewares/passport';

const get = async (page) => {
  const uuid = payload.uuid;
  const [accRes, err] = await of(db.accounts.findAll({
    where: { uuid },
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }));
  const accid = accRes[0].dataValues.accid;
  if (page) {
    console.log(page);
    const [response, errr] = await of(db.contacts.findAll({
      limit: 5,
      offset: page*5,
      where: { accid },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }));
    return response || errr;
  }
  const [response, errr] = await of(db.contacts.findAll({
    limit: 6,
    where: { accid },
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }));
  return response || errr;
}
export default get;
