import db from '../../models/index.js';
import of from '../../helpers/awaitof.js';

const get = async ({ uuid, page }) => {
  const [accRes, err] = await of(db.accounts.findAll({
    where: { uuid },
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }));
  const accid = accRes[0].dataValues.accid;

  const [response, errr] = await of(db.contacts.findAll({
    limit: 5,
    offset: page,
    where: { accid },
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }));
  console.log(response)
  return response || errr;
}
export default get;
