import bcrypt from 'bcrypt';
import express, { Router } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { AuthBody, ILoginMessage } from '../common_types/API';
import { Nullable } from '../common_types/TypeUtils';
import User, { DocumentUser } from '../db/models/User';

const authRouter: (jwtSecret: string) => Router = (jwtSecret: string) => {

  /** create router */
  const router: Router = Router();

  /** login */
  router.post(
    '/',
    [
      /** login validator **/
      check('login', 'incorrect login').exists().notEmpty(),
      /** password validator **/
      check('password', 'incorrect password').exists().notEmpty()
    ],
    async (req: express.Request<ParamsDictionary, any, AuthBody>, res: express.Response) => {

      try {
        /** validate results */
        const errors = validationResult(req.body)

        /** if it is empty continue login */
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'incorrect login data'
          });
        }

        /** extract "login" and "password" data from request body */
        const { login, password } = req.body;

        /** find user by login */
        const user: Nullable<DocumentUser> = await User.findOne({ login });

        if (!user) {
          return await res.status(400).json({ error: 'User not found' });
        }

        /** check password with bcrypt */
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
          return await res.status(400).json({ error: 'Invalid login or password' })
        }

        /** jwt token for auth user */
        const token = jwt.sign(
          { user },
          jwtSecret,
          { expiresIn: '24h' }
        );

        /** prepare response message */
        const responseMessage: ILoginMessage = {
          admin: user.admin,
          message: 'Successfully login',
        }

        /** set token to cookie */
        await res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production'
        }).json(responseMessage);
      }
      catch (e) {
        res.status(500).json({ error: 'something failed' });
        console.error(e);
      }
    }
  );

  /** logout - clear cookie */
  router.delete(
    '/',
    async (req: express.Request, res: express.Response) => {
      res.clearCookie('token')
        .status(200)
        .end();
    }
  );

  return router;
};

export default authRouter;
