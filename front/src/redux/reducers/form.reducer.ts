import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IForm } from '../../../../src/common_types/interfaces/Form';

export type FormState = {
  forms: IForm[];
};

const initialState: FormState = {
  forms: [],
};

const slice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    createForm(state: FormState, action: PayloadAction<IForm>) {
      state.forms.push(action.payload);
      return state;
    },
    loadForms(state: FormState, action: PayloadAction<IForm[]>) {
      state.forms = action.payload;
      return state;
    },
  },
});

const { reducer, actions } = slice;

export const { createForm, loadForms } = actions;

export default reducer;
