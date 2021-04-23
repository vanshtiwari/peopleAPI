import {
  ERROR,
  STATUS,
  SUCCESS,
} from '../helpers/message.js';
import { sendFailureResponse, sendSuccessResponse, setTokenCookie } from '../helpers/response.js';
import of from '../helpers/awaitof.js'
import { login, loginTokens } from '../services/user/login.js';
import updateUserService from '../services/user/update.js';
import newTokenUserService from '../services/user/newToken.js';
import logoutUserService from '../services/user/logout.js';

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
    const { finalResponse, refreshToken } = await loginTokens(userCredentials);
    if (finalResponse) {
      console.log(finalResponse, refreshToken);
      setTokenCookie(res, refreshToken);
      sendSuccessResponse(req, res, { message: SUCCESS.userAuthenticated, data: finalResponse });
    } else {
      sendFailureResponse(req, res, { message: ERROR.invalidCred, status: STATUS.failed, });
    }
  },

  logout: async (req, res) => {
    const userId = req.body;
    const response = await of(logoutUserService(userId));
    if (response) {
      setTokenCookie(res);
      sendSuccessResponse(req, res, { message: SUCCESS.userLogOut, data: response });
    } else {
      sendFailureResponse(req, res, { message: ERROR.internalServerError, status: STATUS.failed, });
    }
  },
  newToken: async (req, res) => {
    const userId = req.body;
    const refreshToken = await of(newTokenUserService(userId));
    if (response) {
      setTokenCookie(res,refreshToken);
      sendSuccessResponse(req, res, { message: SUCCESS.userLogOut, data: '' });
    } else {
      sendFailureResponse(req, res, { message: ERROR.internalServerError, status: STATUS.failed, });
    }
  },
}
export default userController;
