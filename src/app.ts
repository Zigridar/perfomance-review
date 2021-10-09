import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, {Express} from 'express';
import http from 'http';
import path from 'path';
import {Server} from 'socket.io';
import {APIPath} from './APIPath';
import {getConfig} from './config';
import {dbConnect} from './db/connect';
import {createUserIfNotExists} from './db/models/User';
import adminRouter from './routes/admin.route';
import authRouter from './routes/auth.route';
import socketController from './socket/socketController';

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

/** Production mode **/
if (config.MODE === 'production') {
  app.use('/', express.static(path.join(__dirname, 'front')));
}

/** run server */
server.listen(config.PORT, () => {
  /** init socket controller */
  socketController(new Server(server, {
    maxHttpBufferSize: 1e8
  }));

  console.info(`Server startup ${new Date().toUTCString()}`);
});

/** init db connection */
dbConnect(config.MONGO_URI)
  .then(() => {
    createUserIfNotExists()
      .then(user => {
        if (user)
          console.info(`User with login ${user.login} was successfully created`)
      })
  })
  .catch((err: Error) => {
    console.error('DB CONNECTION ERROR');
    console.error(err.message);
    process.exit(1);
  });
