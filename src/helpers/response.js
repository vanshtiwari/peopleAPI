import {
  ERROR,
  STATUS,
  SUCCESS,
} from '../helpers/message.js';

const sendSuccessResponse = (req, res, obj) => {
  return res.status(STATUS.success).send({
    message: (obj && obj.message) || SUCCESS.success,
    data: obj.data || []
  })
}

const sendFailureResponse = (req, res, obj) => {
  const errorCode = (obj && obj.status) || STATUS.badGateway;
  return res.status(errorCode).send({
    error: true,
    message: (obj && obj.message) || ERROR.internalServerError,
    data: []
  })
}

const setTokenCookie = (res, token) => {
  // create http only cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  };
  token ? res.cookie('refreshToken', token, cookieOptions) : res.clearCookie('refreshToken');
}

export {
  sendFailureResponse,
  sendSuccessResponse,
  setTokenCookie
}
