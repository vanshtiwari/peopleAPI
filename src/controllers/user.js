import {
  ERROR,
  STATUS,
  SUCCESS,
} from '../helpers/message.js';
import { sendFailureResponse, sendSuccessResponse, setTokenCookie } from '../helpers/response.js';
import of from '../helpers/awaitof.js'
import { login, loginTokens } from '../services/user/login.js';
import newTokenUserService from '../services/user/newToken.js';
import logoutUserService from '../services/user/logout.js';

const userController = {
  login: async (req, res) => {
    const userCredentials = req.body;
    const response = await login(userCredentials);
    if (response) {
      sendSuccessResponse(req, res, { message: SUCCESS.authLink, data: response });
    } else {
      sendFailureResponse(req, res, { message: ERROR.invalidCred, status: STATUS.failed, });
    }
  },

  loginTokens: async (req, res) => {
    const userCredentials = req.body;
    const { finalResponse, refreshToken } = await loginTokens(userCredentials);
    if (finalResponse) {
      setTokenCookie(res, refreshToken);
      sendSuccessResponse(req, res, { message: SUCCESS.userAuthenticated, data: finalResponse });
    } else {
      sendFailureResponse(req, res, { message: ERROR.invalidCred, status: STATUS.failed, });
    }
  },

  logOut: async (req, res) => {
    const response = await of(logoutUserService());
    if (response) {
      setTokenCookie(res);
      sendSuccessResponse(req, res, { message: SUCCESS.userLogOut, data: {} });
    } else {
      sendFailureResponse(req, res, { message: ERROR.internalServerError, status: STATUS.failed, });
    }
  },
  newToken: async (req, res) => {
    const [refreshToken] = await of(newTokenUserService(req.body.refreshToken));
    if (refreshToken) {
      setTokenCookie(res, refreshToken);
      sendSuccessResponse(req, res, { message: SUCCESS.newTokenGenerated, data: '' });
    } else {
      sendFailureResponse(req, res, { message: ERROR.internalServerError, status: STATUS.failed, });
    }
  },
}
export default userController;
