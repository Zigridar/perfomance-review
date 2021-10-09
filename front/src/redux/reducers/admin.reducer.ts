import {IUserWithId} from "../../../../src/common_types/interfaces/User";

export const CREATE_USER = 'CREATE_USER';
export const EDIT_USER = 'EDIT_USER';
export const DELETE_USER = 'DELETE_USER';
export const LOAD_USERS = 'LOAD_USERS';

export interface AdminState {
  users: IUserWithId[];
}

interface IWithUser {
  user: IUserWithId;
}

export interface CreateUserAction extends IWithUser {
  type: typeof CREATE_USER;
}

export interface EditUserAction extends IWithUser {
  type: typeof EDIT_USER;
}

export interface DeleteUserAction {
  type: typeof DELETE_USER;
  userId: string;
}

export interface LoadUsersAction {
  type: typeof LOAD_USERS;
  users: IUserWithId[];
}

export type AdminAction = CreateUserAction | EditUserAction | DeleteUserAction | LoadUsersAction;

const initialState: AdminState = {
  users: []
}

const adminReducer = (state: AdminState = initialState, action: AdminAction) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.user]
      }
    case EDIT_USER:
      return {
        ...state,
        users: [
          ...state.users.filter(old => old.id !== action.user.id),
          action.user
        ]
      }
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.userId)
      }
    case LOAD_USERS:
      return {
        ...state,
        users: action.users
      }
    default:
      return state;
  }
}

export default adminReducer;
