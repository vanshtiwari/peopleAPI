import db from '../../models/index.js';
import of from '../../helpers/awaitof.js';

const update = async (data) => {
  if (data.cmid) {
    const [comment, err] = await of(db.comments.findOne({
      where: { cmid: data.cmid }
    }));
    if (comment) {
      const [updatedComment, err] = await of(db.comments.update(data, {
        where: { cmid: data.cmid }
      }));
      return updatedComment || err;
    } else {
      return err
    }
  }
}
export default update;
