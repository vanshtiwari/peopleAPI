import express from 'express'
import userController from '../controllers/user.js';

const userRouter = express();

userRouter.route('/logout',)
  .get(userController.logOut)

userRouter.route('/newtoken',)
  .post(userController.newToken)

userRouter.route('/logintokens',)
  .post(userController.loginTokens)

userRouter.route('/login',)
  .get(userController.login)


export default userRouter;
