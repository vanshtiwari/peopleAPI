import express from 'express';
import { ERROR, STATUS } from './helpers/message.js';
import initRoutes from './routes/index.js';
import passport from 'passport';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(passport.initialize());
initRoutes(app);

app.use('*', (req, res) => {
  res.status(STATUS.notFound).send({
    error: ERROR.pageNotFound,
  });
});

export default app.listen(PORT, () => { console.log('Server started on port ' + process.env.PORT); });
