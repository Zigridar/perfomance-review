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


/** Типы вопросов */
export const CLOSED = 'CLOSED';
export const OPEN = 'OPEN';

export type QuestionType = typeof CLOSED | typeof OPEN;

