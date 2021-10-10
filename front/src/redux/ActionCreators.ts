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
import {IQuestion} from "../../../src/common_types/interfaces/Question";
import {CREATE_QUESTION, CreateQuestionAction, LOAD_QUESTIONS, LoadQuestionsAction} from "./reducers/question.reducer";
import {IForm} from "../../../src/common_types/interfaces/Form";
import {CREATE_FORM, CreateFormAction, LOAD_FORMS, LoadFormsAction} from "./reducers/form.reducer";

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

export const loadQuestions: (questions: IQuestion[]) => LoadQuestionsAction = (questions: IQuestion[]) => ({
  type: LOAD_QUESTIONS,
  questions
})

export const createQuestion: (question: IQuestion) => CreateQuestionAction = (question: IQuestion) => ({
  type: CREATE_QUESTION,
  question
})

export const loadForms: (forms: IForm[]) => LoadFormsAction = (forms: IForm[]) => ({
  type: LOAD_FORMS,
  forms
})

export const createForm: (form: IForm) => CreateFormAction = (form: IForm) => ({
  type: CREATE_FORM,
  form
})
