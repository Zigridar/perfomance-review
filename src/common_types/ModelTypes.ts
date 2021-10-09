export interface IUser {
  login: string;
  password: string;
  name: string;
  admin: boolean;
  leader: boolean;
}

export interface IUserWithId extends IUser {
  id: string;
}