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

/** Вопрос */
export interface IQuestion {
  text: string;
  type: QuestionType;
  answers?: Array<IAnswer>;
  scored?: boolean;
}

/** Типы ревью */
const SELF_ATTESTATION = 'SELF_ATTESTATION';
const ATTESTATION = 'ATTESTATION';
const AROUND = 'AROUND';
const ONE_TO_ONE = 'ONE_TO_ONE';

export type ReviewType = typeof SELF_ATTESTATION
| typeof ATTESTATION
| typeof AROUND
| typeof ONE_TO_ONE;

/** Типы вопросов */
const CLOSED = 'CLOSED';
const ALTERNATIVE = 'ALTERNATIVE';

export type QuestionType = typeof CLOSED | typeof ALTERNATIVE;
