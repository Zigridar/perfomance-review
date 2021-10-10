import {IForm} from "../../../../src/common_types/interfaces/Form";

export const LOAD_FORMS = 'LOAD_FORMS';
export const CREATE_FORM = 'CREATE_FORM';

export type FormState = {
  forms: IForm[];
}

export interface CreateFormAction {
  type: typeof CREATE_FORM;
  form: IForm;
}

export interface LoadFormsAction {
  type: typeof LOAD_FORMS;
  forms: IForm[];
}

export type FormAction = CreateFormAction | LoadFormsAction;

const initialState: FormState = {
  forms: []
}

const formReducer: (state: FormState, action: FormAction) => FormState = (state: FormState = initialState, action: FormAction) => {
  switch (action.type) {
    case CREATE_FORM:
      return {
        ...state,
        forms: [...state.forms, action.form]
      }
    case LOAD_FORMS:
      return {
        ...state,
        forms: [...action.forms]
      }
    default:
      return state
  }
}

export default formReducer
