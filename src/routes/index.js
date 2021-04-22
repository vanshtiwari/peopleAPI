import contact from './contact.js';
import user from './user.js';
import comment from './comment.js';

const initRoutes = (app) => {
  app.use('/users', user);
  app.use('/contacts', contact);
  app.use('/comments', comment);
}
export default initRoutes;
