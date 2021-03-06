import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import http from 'http';
import path from 'path';
import { APIPath } from './APIPath';
import { getConfig } from './config';
import { dbConnect } from './db/connect';
import { createUserIfNotExists } from './db/models/User';
import { datamocks } from './mocks/datamocks';
import adminRouter from './routes/admin.route';
import authRouter from './routes/auth.route';
import formRouter from './routes/form.route';
import perfomanveReviewRouter from './routes/perfomance-review.route';
import questionRouter from './routes/question.route';

/** app config */
const config = getConfig();

/** init server application **/
const app: Express = express();
/** create http server for application requests and socket.io  */
const server = http.createServer(app);

/** set body-parser **/
app.use(bodyParser.json());

/** set cookie parser */
app.use(cookieParser());

/** set auth router */
app.use(APIPath.auth, authRouter(config.JWT_SECRET));

/** set admin router */
app.use(APIPath.admin.root, adminRouter(config.JWT_SECRET));

/** set question router */
app.use(APIPath.question, questionRouter(config.JWT_SECRET));

/** set form router */
app.use(APIPath.form, formRouter(config.JWT_SECRET));

/** set perfomance review router */
app.use(APIPath.performanceReview, perfomanveReviewRouter(config.JWT_SECRET));

/** Production mode **/
if (config.MODE === 'production') {
  app.use('/', express.static(path.join(__dirname, 'front')));
}

/** run server */
server.listen(config.PORT, () => {
  console.info(`Server startup ${new Date().toUTCString()}`);
});

/** init db connection */
dbConnect(config.MONGO_URI)
  .then(() => {
    createUserIfNotExists()
      .then(user => {
        if (user)
          console.info(`User with login ${user.login} was successfully created`);

        datamocks().then(() => {
          console.log('data mocks successfully. I hope');
        });
      });
  })
  .catch((err: Error) => {
    console.error('DB CONNECTION ERROR');
    console.error(err.message);
    process.exit(1);
  });
