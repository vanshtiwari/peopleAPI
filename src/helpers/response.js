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
export {
  sendFailureResponse,
  sendSuccessResponse
}
