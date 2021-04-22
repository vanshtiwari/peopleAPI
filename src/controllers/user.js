import {
  ERROR,
  STATUS,
  SUCCESS,
} from '../helpers/message.js';
import { sendFailureResponse, sendSuccessResponse } from '../helpers/response.js';
import of from '../helpers/awaitof.js'
import { login, loginTokens } from '../services/user/login.js';
import updateUserService from '../services/user/update.js';

const userController = {
  update: async (req, res) => {
    const userData = req.body;
    userData['id'] = req.params.id;
    const [response, err] = await of(updateUserService(userData));
    if (response) {
      sendSuccessResponse(req, res, { message: SUCCESS.userChanged, });
    } else {
      sendFailureResponse(req, res, { message: ERROR.userNotChanged, status: STATUS.failed, });
    }
  },

  login: async (req, res) => {
    const userCredentials = req.body;
    const response = await login(userCredentials);
    if (response) {
      sendSuccessResponse(req, res, { message: SUCCESS.userAuthenticated, data: response });
    } else {
      sendFailureResponse(req, res, { message: ERROR.invalidCred, status: STATUS.failed, });
    }
  },

  loginTokens: async (req, res) => {
    const userCredentials = req.body;
    const response = await loginTokens(userCredentials);
    if (response) {
      sendSuccessResponse(req, res, { message: SUCCESS.userAuthenticated, data: response });
    } else {
      sendFailureResponse(req, res, { message: ERROR.invalidCred, status: STATUS.failed, });
    }
  }
}
export default userController;
