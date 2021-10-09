import {Nullable} from './TypeUtils';

export interface IUser extends IExpirationDate {
  login: string;
  password: string;
  name: string;
  admin: boolean;
  roomToken: Nullable<string>;
}

export interface IUserWithId extends IUser {
  id: string;
}

export interface IExpirationDate {
  expirationDate: Date;
}
