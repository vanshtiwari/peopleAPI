import express from 'express';
import contactController from '../controllers/contact.js';
import passport from 'passport';
import passportService from '../middlewares/passport.js';

passportService(passport);

const contactRouter = express();
const passportAuth = passport.authenticate('jwt', { session: false });

contactRouter.route('/',)
  .post(passportAuth, contactController.get)

contactRouter.route('/:id',)
  .put(passportAuth, contactController.update)

export default contactRouter;
