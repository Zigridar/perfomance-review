import { IUser } from './interfaces/User';

declare global {

  declare namespace Express {
    /** Extends express.Request */
    interface Request {
      user: IUser
    }
  }
}