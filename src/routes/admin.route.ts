import bcrypt from 'bcrypt';
import express, { Router } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { check, validationResult } from 'express-validator';
import { APIPath } from '../APIPath';
import { IUserMessage, IUsersMessage } from '../common_types/API';
import { IUser, IUserWithId } from '../common_types/interfaces/User';
import { Nullable } from '../common_types/TypeUtils';
import User, { DocumentUser, toIUserWithId } from '../db/models/User';
import admin from '../middleware/admin.middleware';
import auth from '../middleware/auth.middleware';

const adminRouter: (jwtSecret: string) => Router = (jwtSecret: string) => {

  const router = Router();

  /** get all users */
  router.get(
    APIPath.admin.user,
    [
      auth(jwtSecret),
      admin
    ],
    async (req: express.Request, res: express.Response) => {
      try {
        const users: DocumentUser[] = await User.find().sort({ name: 1 });

        const usersToClient: IUserWithId[] = users.map(toIUserWithId);

        const responseMessage: IUsersMessage = {
          users: usersToClient
        }

        await res.json(responseMessage);
      }
      catch (e) {
        await res.status(500).json({ message: 'something failed!' })
        console.error(e);
      }
    }
  )

  /** create user */
  router.put(
    APIPath.admin.user,
    [
      auth(jwtSecret),
      admin,
      check('login', 'incorrect login').exists().notEmpty(),
      check('password', 'incorrect password').exists().notEmpty(),
      check('name', 'incorrect mane').exists().notEmpty()
    ],
    async (req: express.Request<ParamsDictionary, any, IUser>, res: express.Response) => {
      try {

        const errors = validationResult(req.body);

        /** if it is empty continue */
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'incorrect data'
          });
        }

        const { login, password, name, admin, leader } = req.body;

        const user = new User();
        user.login = login;
        user.password = await bcrypt.hash(password, 10);
        user.admin = !!admin;
        user.name = name;
        user.leader = leader;
        await user.save();

        const responseMessage: IUserMessage = {
          user: toIUserWithId(user)
        }

        await res.json(responseMessage);
      }
      catch (e: any) {
        console.error(e);
        await res.status(500).json({ error: `can\`t save user, ${e.message}` });
      }
    }
  );

  /** edit user */
  router.post(
    APIPath.admin.user,
    [
      auth(jwtSecret),
      admin,
      check('id', 'incorrect id').exists().notEmpty(),
      check('login', 'incorrect login').exists().notEmpty(),
      check('name', 'incorrect mane').exists().notEmpty(),
      check('expirationDate', 'incorrect mane').exists()
    ],
    async (req: express.Request<ParamsDictionary, any, IUserWithId>, res: express.Response) => {
      try {

        const errors = validationResult(req.body);

        /** if it is empty continue */
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'incorrect data'
          });
        }

        const { id: _id, login, password, name, admin, leader } = req.body;

        /** find user by id */
        const user: Nullable<DocumentUser> = await User.findOne({ _id })

        if (user) {
          user.login = login;
          user.name = name;
          user.admin = admin;
          user.leader = leader;
          if (password) {
            user.password = await bcrypt.hash(password, 10);
          }
          await user.save();

          const responseMessage: IUserMessage = {
            user: toIUserWithId(user)
          }

          await res.json(responseMessage);
        }
        else {
          await res.status(400).json({ message: 'user not found' });
        }

      }
      catch (e: any) {
        await res.status(500).json({ error: `can\`t update user, ${e.message}` });
      }
    }
  );

  /** delete user */
  router.delete(
    APIPath.admin.user,
    [
      auth(jwtSecret),
      admin,
      check('id').exists().notEmpty()
    ],
    async (req: express.Request<ParamsDictionary, any, IUserWithId>, res: express.Response) => {
      try {
        const errors = validationResult(req.body);

        /** if it is empty continue */
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'incorrect data'
          });
        }

        const { id: _id } = req.body;

        const user: Nullable<DocumentUser> = await User.findOne({ _id });

        if (user) {
          const responseMessage: IUserMessage = {
            user: toIUserWithId(user)
          }
          await user.delete();
          await res.json(responseMessage);
        }
        else {
          await res.status(400).json({ error: 'user not found' });
        }

      }
      catch (e: any) {
        await res.status(500).json({ error: `can\` delete user, ${e.message}` });
      }
    }
  );

  return router;
}

export default adminRouter;
