import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserWithId } from '../../../../src/common_types/interfaces/User';

export interface AdminState {
  users: IUserWithId[];
}

const initialState: AdminState = {
  users: [],
};

const slice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    createUser(state: AdminState, action: PayloadAction<IUserWithId>) {
      state.users.push(action.payload);
      return state;
    },
    editUser(state: AdminState, action: PayloadAction<IUserWithId>) {
      state.users = [...state.users.filter(old => old.id !== action.payload.id), action.payload];
      return state;
    },
    deleteUser(state: AdminState, action: PayloadAction<string>) {
      state.users = state.users.filter(user => user.id !== action.payload);
      return state;
    },
    loadUsers(state: AdminState, action: PayloadAction<IUserWithId[]>) {
      state.users = action.payload;
      return state;
    },
  },
});

const { reducer, actions } = slice;

export const { createUser, editUser, deleteUser, loadUsers } = actions;

export default reducer;
