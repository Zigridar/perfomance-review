import { IQuestionWithId } from './interfaces/Question';
import { IUserWithId } from './interfaces/User';
import { IFormWithId } from "./interfaces/Form";

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

export interface IQuestionsMessage {
  questions: IQuestionWithId[];
}

export interface IQuestionMessage {
  question: IQuestionWithId;
}

export interface IUserMessage {
  user: IUserWithId;
}

export interface IFormMessage {
  form: IFormWithId;
}

export interface IFormsMessage {
  forms: IFormWithId[];
}
