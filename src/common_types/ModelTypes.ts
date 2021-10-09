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

/** Шаблон теста */
export interface IForm {
  description: string;
  type: ReviewType;
  questions: Array<IQuestion>;
  author: IUserWithId;
}

/** Ответ */
export interface IAnswer {
  text: string;
  isCorrect: boolean;
}

export interface IQuestionWithId extends IQuestion {
  id: string;
}

/** Вопрос */
export interface IQuestion {
  text: string;
  type: QuestionType;
  variable?: boolean;
  answers?: Array<IAnswer>;
  scored?: boolean;
}

/** Типы ревью */
export const SELF_ATTESTATION = 'SELF_ATTESTATION';
export const ATTESTATION = 'ATTESTATION';
export const AROUND = 'AROUND';
export const ONE_TO_ONE = 'ONE_TO_ONE';

export type ReviewType = typeof SELF_ATTESTATION
| typeof ATTESTATION
| typeof AROUND
| typeof ONE_TO_ONE;

/** Типы вопросов */
export const CLOSED = 'CLOSED';
export const OPEN = 'OPEN';

export type QuestionType = typeof CLOSED | typeof OPEN;
