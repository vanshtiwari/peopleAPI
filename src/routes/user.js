import express from 'express'
import userController from '../controllers/user.js';

const userRouter = express();

userRouter.route('/logout',)
  .post(userController.logout)

userRouter.route('/logintokens',)
  .post(userController.loginTokens)

userRouter.route('/login',)
  .get(userController.login)

userRouter.route('/:id',)
  .put(userController.update)

export default userRouter;
