import {
  ERROR,
  STATUS,
  SUCCESS,
} from '../helpers/message.js';
import { sendFailureResponse, sendSuccessResponse } from '../helpers/response.js';
import of from '../helpers/awaitof.js'
import getContactService from '../services/contact/get.js';
import updateContactService from '../services/contact/update.js';

const contactController = {
  get: async (req, res) => {
    const data = req.body;
    const [response, err] = await of(getContactService(data));
    if (response) {
      sendSuccessResponse(req, res, { message: SUCCESS.contactsFetched, data: response });
    } else {
      sendFailureResponse(req, res, { message: ERROR.contactsNotFound, status: STATUS.failed, });
    }
  },

  update: async (req, res) => {
    const contactData = req.body;
    contactData['id'] = req.params.id;
    const [response, err] = await of(updateContactService(contactData));
    if (response) {
      sendSuccessResponse(req, res, { message: SUCCESS.contactChanged, });
    } else {
      sendFailureResponse(req, res, { message: ERROR.input, status: STATUS.failed, });
    }
  },
}
export default contactController;
