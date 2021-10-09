import bcrypt from 'bcrypt';
import {Document, model, Model, Schema} from 'mongoose';
import {IUser, IUserWithId} from '../../common_types/ModelTypes';
import {Nullable} from '../../common_types/TypeUtils';
import {getConfig} from '../../config';

export type DocumentUser = Document & IUser;

const UserSchema: Schema<DocumentUser> = new Schema<DocumentUser>({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  admin: { type: Boolean, required: true, default: false },
  roomToken: { type: String }
});

const User: Model<DocumentUser> = model<DocumentUser>('user', UserSchema);

export default User;

/** creates user if db is empty */
export const createUserIfNotExists: () => Promise<Nullable<DocumentUser>> = async () => {
  const usersCount: number = await User.countDocuments();
  if (!usersCount) {
    const config = getConfig();

    const user = new User();
    user.login = config.INIT_USER_LOGIN;
    user.password = await bcrypt.hash(config.INIT_USER_PASSWORD, 10);
    user.name = 'Auto';
    user.admin = true;
    user.roomToken = 'auto';
    user.expirationDate = new Date(2100, 11, 1);
    return await user.save();
  }
  else return null;
};

/** Convert to IUserWithId model */
export const toIUserWithId: (user: DocumentUser) => IUserWithId = (user: DocumentUser) => {
  return {
    id: user._id,
    expirationDate: user.expirationDate,
    password: user.password,
    login: user.login,
    admin: user.admin,
    roomToken: user.roomToken,
    name: user.name
  };
}