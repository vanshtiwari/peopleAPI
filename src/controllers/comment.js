import {
  ERROR,
  STATUS,
  SUCCESS,
} from '../helpers/message.js';
import { sendFailureResponse, sendSuccessResponse } from '../helpers/response.js';
import of from '../helpers/awaitof.js'
import createCommentService from '../services/comment/create.js';
import deleteCommentService from '../services/comment/delete.js';
import getCommentService from '../services/comment/get.js';
import updateCommentService from '../services/comment/update.js';

const commentController = {
  get: async (req, res) => {
    const cid = req.params.cid;
    const [response, err] = await of(getCommentService(cid));
    if (response) {
      sendSuccessResponse(req, res, { message: SUCCESS.commentsFetched, data: response });
    } else {
      sendFailureResponse(req, res, { message: ERROR.commentNotFound, status: STATUS.failed, });
    }
  },

  create: async (req, res) => {
    const commentData = req.body;
    commentData['cid'] = req.params.cid;
    const [response, err] = await of(createCommentService(commentData));
    if (response) {
      sendSuccessResponse(req, res, { message: SUCCESS.commentCreated, data: response });
    } else {
      sendFailureResponse(req, res, { message: ERROR.input, status: STATUS.failed, });
    }
  },

  update: async (req, res) => {
    const commentData = req.body;
    commentData['cmid'] = req.params.cmid;
    const [response, err] = await of(updateCommentService(commentData));
    if (response) {
      sendSuccessResponse(req, res, { message: SUCCESS.commentChanged, });
    } else {
      sendFailureResponse(req, res, { message: ERROR.input, status: STATUS.failed, });
    }
  },

  delete: async (req, res) => {
    const [response, err] = await of(deleteCommentService(req.params.cmid))
    if (response) {
      sendSuccessResponse(req, res, { message: SUCCESS.commentDeleted, });
    } else {
      sendFailureResponse(req, res, { message: ERROR.commentNotFound, status: STATUS.failed, });
    }
  }
}
export default commentController;
