import {
  CREATE_USER,
  CreateUserAction,
  DELETE_USER,
  DeleteUserAction,
  EDIT_USER,
  EditUserAction,
  LOAD_USERS,
  LoadUsersAction
} from './reducers/admin.reducer';
import {IUserWithId} from "../../../src/common_types/interfaces/User";

export const createUser: (user: IUserWithId) => CreateUserAction = (user: IUserWithId) => ({
  type: CREATE_USER,
  user
})

export const editUser: (user: IUserWithId) => EditUserAction = (user: IUserWithId) => ({
  type: EDIT_USER,
  user
})

export const deleteUser: (userId: string) => DeleteUserAction = (userId: string) => ({
  type: DELETE_USER,
  userId
})

export const loadUsers: (users: IUserWithId[]) => LoadUsersAction = (users: IUserWithId[]) => ({
  users,
  type: LOAD_USERS
})
