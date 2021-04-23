import db from '../../models/index.js';
import of from '../../helpers/awaitof.js';

const update = async (data) => {
  // if (data.id && (data.name || data.uuid || data.uuid)) {
  //   const [comment, err] = await of(db.comments.findOne({
  //     where: { id: data.id }
  //   }));
  //   if (comment) {
  //     const [updatedComment, err] = await of(db.comments.update(data, {
  //       where: { id: data.id }
  //     }));
  //     return updatedComment || err;
  //   } else {
  //     return err
  //   }
  // }
}
export default update;
