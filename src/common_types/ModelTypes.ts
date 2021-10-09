export interface IUser {
  login: string;
  password: string;
  name: string;
  admin: boolean;
}

export interface IUserWithId extends IUser {
  id: string;
}
