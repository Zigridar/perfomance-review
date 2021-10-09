import {IUserWithId} from './ModelTypes';
import {Nullable} from './TypeUtils';

export interface AuthBody {
  login: string;
  password: string;
}

export interface ILoginMessage {
  message: string;
  admin: boolean;
}

export interface IUsersMessage {
  users: IUserWithId[];
}

export interface IUserMessage {
  user: IUserWithId;
}
