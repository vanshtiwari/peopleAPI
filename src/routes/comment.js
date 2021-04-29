import express from 'express';
import commentController from '../controllers/comment.js';
import passport from 'passport';
import passportService from '../middlewares/passport.js';

passportService(passport);
const commentRouter = express();
const passportAuth = passport.authenticate('jwt', { session: false });

commentRouter.route('/:cid',)
  .get(passportAuth, commentController.get)
  .post(passportAuth, commentController.create)

commentRouter.route('/:cmid',)
  .put(passportAuth, commentController.update)
  .delete(passportAuth, commentController.delete)

export default commentRouter;
