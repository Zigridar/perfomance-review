import {IUser} from './ModelTypes';

declare global {

  declare namespace Express {
    /** Extends express.Request */
    interface Request {
      user: IUser
    }
  }
}