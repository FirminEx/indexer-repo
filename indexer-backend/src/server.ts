import 'dotenv/config';
import express from 'express';
import responseTime from 'response-time';
import router from './modules/user-operation-events/user-operation-events.router';
import { listenToUserOperationEvents } from './utils/listener';
import logger from './utils/logging';
import cors from 'cors';
await listenToUserOperationEvents();

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  responseTime((req, res, time) => {
    logger.info('Request completed', {
      method: req.method,
      statusCode: res.statusCode,
      responseTime: `${time.toFixed(2)}ms`,
    });
  }),
);

app.use('/user-operation-events', router);

app.listen(3000, () => {
  logger.info('Server is running on port 3000');
});
