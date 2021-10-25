import express from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../common_types/interfaces/User';

/**
 * Use the middleware for any routes (except auth.routes.ts)
 * */
const auth = (jwtSecret: string) => (req: express.Request, res: express.Response, next: () => void) => {

  /** break if test request **/
  if (req.method === 'OPTIONS')
    return next();

  try {
    /** parse token from authorization header **/
    const token = req?.cookies?.token;

    /** break if token non-valid **/
    if (!token)
      return res.status(401).json('no authorization');

    /** set user jwt object  to request **/
    req.user = (jwt.verify(token, jwtSecret) as any).user as IUser;
    /** apply next handler **/
    next();
  } catch (e) {
    res.status(401).json('no authorization');
  }
};

export default auth;